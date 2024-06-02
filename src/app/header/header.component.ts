import { Component, Input, OnInit } from '@angular/core';
import { CategoryMenu } from '../Interfaces/categoryMenu';
import { UserService } from '../services/user.service';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';
import { filter } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { NotificationComponent } from '../common/notification/notification.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public categoryMenu!: CategoryMenu[];
  public navigation: any;
  public showMiniCart: Boolean = true;
  public numberOfCartItems: any = 0;
  public cartBadgeShow: Boolean = false;
  public userToken = localStorage.getItem('userToken');
 

  constructor(
    private userservice: UserService,
    private router: Router,
    private sharedservice: SharedService,
    private notif: NotificationComponent,
    private spinner: NgxSpinnerService
  ) {
    this.router.events
    .pipe(
      filter(event=> event instanceof NavigationStart)
    )
    .subscribe((event: NavigationEvent)=>{
      this.navigation = event;
      this.showMiniCart = !this.navigation.url.includes('/cart')
    })
  }

  ngOnInit(): void {
    this.getCategorySubcategory();
    
    if(localStorage.getItem('userToken')){
    this.fetchCartItems();
    }
    this.sharedservice.getIconUpdated().subscribe(()=>{
      this.fetchCartItems();
    })
    this.sharedservice.showNewTopNavData().subscribe((data)=>{
      this.userToken = localStorage.getItem('userToken');
    })
  }

  getCategorySubcategory = () =>{
    this.spinner.show()
    this.userservice.catSubCatFetch().subscribe(({data: { AllCategory }, error} : { data : { AllCategory : Array<CategoryMenu>}, error: boolean})=>{
      this.categoryMenu = AllCategory;
      this.spinner.hide()
    })
  }

  fetchCartItems = () =>{
    this.userservice.fetchCartItems().subscribe(({ error, data })=> {
      this.numberOfCartItems = data?.length;
      this.cartBadgeShow = this.numberOfCartItems > 0 ? true : false;
    })
  }

  logout = () =>{
    this.userservice.logOut().subscribe(({ error, data })=>{
      this.notif.showSuccess(data)
      localStorage.removeItem('userToken');
      this.router.navigate(['home'])
      this.userToken = null;
      this.fetchCartItems()
      // location.reload()
    })
  }

  categoryClick = (categoryName: string) =>{
    this.router.navigate(['ourproducts',{term: categoryName}])
  }

  subCategoryClick = (subCategoryName: string) =>{
    this.router.navigate(['ourproducts',{term: subCategoryName}])
  }

}

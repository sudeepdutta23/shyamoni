import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from '../common/notification/notification.component';
import { Product } from '../Interfaces/product';
import { ProductImage } from '../Interfaces/ProductImage';
import { ProductWeight } from '../Interfaces/ProductWeight';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: any;
  public productImage!: any;
  public productWeight!: any;
  public env = environment;
  
  constructor(private router: Router, private notif: NotificationComponent, private userservice: UserService) {}
  
  ngOnInit(): void {
    this.productImage = this.product?.product_image;
    this.productWeight = this.product?.product_weight;  
  }

  navigateToProduct = (id: string) =>{
    this.router.navigate([`product/${id}`])
  }

  addToCart = (product: Product) =>{
    const body = {
      product: product.id,
      pieces: 1,
      product_weight: this.productWeight[0].id
    }

    !localStorage.getItem('userToken') ?
    (this.notif.showInfo("Please Login to add cart"),this.router.navigate(['login'])) :
    Number(product.product_weight[0].availableStock) < 1? this.notif.showInfo("Product is out of stock") :
    this.userservice.addToCart(body)
      .subscribe(({error,data})=>{
        if(!error){
          this.notif.showSuccess(data)
        }else{
          this.notif.showError("Something went wrong cart not added")
        }
      })
  }

  setDefault = (e: any) =>{
    e.target.src = this.env.defaultImage;
  }

}

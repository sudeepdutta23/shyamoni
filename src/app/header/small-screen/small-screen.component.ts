import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryMenu } from 'src/app/Interfaces/categoryMenu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-screen',
  templateUrl: './small-screen.component.html',
  styleUrls: ['./small-screen.component.css']
})
export class SmallScreenComponent implements OnInit {
  @Input() menu!: CategoryMenu[];
  @Input() showMiniCart: Boolean = true;
  @Input() numberOfCartItems: any;
  @Input() cartBadgeShow:any;
  @Input() userToken: any;
  @Output() logoutEvent = new EventEmitter<string>();
  @Output() categoryClickEvent = new EventEmitter<string>();
  @Output() subCategoryClickEvent = new EventEmitter<string>();
  @ViewChild("menuIcon", { static: false }) menuIcon!: ElementRef;
  env = environment;
  public openSideMenu = false;
  public isOpenCategories = false;
  public submenu: any = [];
  public showSearch:Boolean = false;
  public searchTerms = "";

  @ViewChild('search') searchElement!: ElementRef;
  @ViewChild('parent') parent!: ElementRef;
  @ViewChild('icon') icon!: ElementRef;
  @ViewChild('plusicon') plusicon!:QueryList<SmallScreenComponent>;
  @ViewChild('minusicon') minusicon!: ElementRef;
  @ViewChild('categories') categories!: ElementRef;

  @HostListener("document:click",['$event'])
  clickedOut(e){
    let html = <HTMLScriptElement> e.target;
    
    if(html.getAttribute('class') == 'fa fa-bars' || html.getAttribute('class') == 'fa fa-plus ng-star-inserted' || html.getAttribute('class') == 'fa fa-minus ng-star-inserted' || html.getAttribute('class') == 'menu-mobile-content box-menu'){
      this.openSideMenu = true
    }else{
      this.openSideMenu = false
    }

    // if(e.target == this.icon.nativeElement){
    //   this.openSideMenu = true
    // }else if(this.parent.nativeElement.contains(e.target)){
    //   this.openSideMenu = true
    // }else if(!this.parent.nativeElement.contains(e.target)){
    //   this.openSideMenu = false
    // }


  }

  constructor(private router: Router, private renderer: Renderer2, private elem: ElementRef) {
    this.renderer.listen('window','click',(e: Event)=>{


      
      // if(e.target == this.icon.nativeElement){
      //   this.openSideMenu=true;
      // }
      // else if(e.target != this.plusicon.nativeElement || e.target != this.minusicon.nativeElement){
      //   this.openSideMenu=false;
      // }
      // else if(this.parent.nativeElement.contains(e.target) == false){
      //   this.openSideMenu=false;
      // }
      
      
      
      
    //   if(e.target == this.icon.nativeElement){
        
    //     this.openSideMenu=true;
    // }else if(e.target != this.parent.nativeElement){
    //   this.openSideMenu=false;
    // }
  //   if(e.target !== this.icon.nativeElement && e.target!==this.parent.nativeElement){
  //     this.openSideMenu=false;
  // }
    })
   }

  ngOnInit(): void {
    let sub;
    this.menu.forEach((val: any, i: number)=>{
      let subKey = `subMenu${i}`
      this.submenu.push({subKey: false})
    })   
  }
  ngAfterViewInit(){
      // $("#menu-icon").click(function () {
      //   $(this).toggleClass("open-menu");
      //   var hClass = $(this).hasClass("open-menu");
      //   if (hClass) {
      //     $(window).resize(function () {
      //       if (window.innerWidth < 1024) {
      //         $(this).parents("body").css("overflow", "hidden");
      //       }
      //     });
      //     $(this)
      //       .parents("body")
      //       .find("#mobile_menu_wrapper")
      //       .addClass("box-menu");
      //   } else {
      //     $(this).parents("body").css("overflow", "visible");
      //     $(this)
      //       .parents("body")
      //       .find("#mobile_menu_wrapper")
      //       .removeClass("box-menu");
      //   }
      // });
      // $(".menu-close").click(function () {
      //   $(this).parents("body").css("overflow", "visible");
      //   $(this)
      //     .parents("body")
      //     .find("#mobile_menu_wrapper")
      //     .removeClass("box-menu");
      //   $(this).parents("body").find("#menu-icon").removeClass("open-menu");
      // });

      // $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").on(
      //   "click",
      //   function () {
      //     if ($(this).hasClass("open_menu")) {
      //       $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").removeClass(
      //         "open_menu"
      //       );
      //       $(this).removeClass("open_menu");
      //       $(this).next(".pos-menu-horizontal .menu-dropdown").slideUp();
      //       $(".pos-menu-horizontal .menu-item > .icon-drop-mobile")
      //         .next(".pos-menu-horizontal .menu-dropdown")
      //         .slideUp();
      //     } else {
      //       $(".pos-menu-horizontal .menu-item > .icon-drop-mobile").removeClass(
      //         "open_menu"
      //       );
      //       $(".pos-menu-horizontal .menu-item > .icon-drop-mobile")
      //         .next(".pos-menu-horizontal .menu-dropdown")
      //         .slideUp();
      //       $(this).addClass("open_menu");
      //       $(this).next(".pos-menu-horizontal .menu-dropdown").slideDown();
      //     }
      //   }
      // );
      
      // $(".pos-menu-horizontal .cat-drop-menu .icon-drop-mobile").on(
      //   "click",
      //   function () {
      //     if ($(this).hasClass("open_menu")) {
      //       $(this)
      //         .parent()
      //         .siblings()
      //         .find(".icon-drop-mobile")
      //         .removeClass("open_menu");
      //       $(this).removeClass("open_menu");
      //       $(this).next(".pos-menu-horizontal .cat-drop-menu").slideUp();
      //       $(this).parent().siblings().find(".cat-drop-menu").slideUp();
      //     } else {
      //       $(this)
      //         .parent()
      //         .siblings()
      //         .find(".icon-drop-mobile")
      //         .removeClass("open_menu");
      //       $(this).parent().siblings().find(".cat-drop-menu").slideUp();
      //       $(this).addClass("open_menu");
      //       $(this).next(".pos-menu-horizontal .cat-drop-menu").slideDown();
      //     }
      //   }
      // );

      // $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").on(
      //   "click",
      //   function () {
      //     if ($(this).hasClass("open_menu")) {
      //       $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").removeClass(
      //         "open_menu"
      //       );
      //       $(this).removeClass("open_menu");
      //       $(this).next(".pos-menu-horizontal ul.ul-column").slideUp();
      //       $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile")
      //         .next(".pos-menu-horizontal ul.ul-column")
      //         .slideUp();
      //     } else {
      //       $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile").removeClass(
      //         "open_menu"
      //       );
      //       $(".pos-menu-horizontal .pos-menu-col > .icon-drop-mobile")
      //         .next(".pos-menu-horizontal ul.ul-column")
      //         .slideUp();
      //       $(this).addClass("open_menu");
      //       $(this).next(".pos-menu-horizontal ul.ul-column").slideDown();
      //     }
      //   }
      // );
    
  }

  openMenu = () =>{
    this.openSideMenu = true;
  }

  closeMenu = () =>{
    this.openSideMenu = false;
  }

  openCategories = () =>{
    this.isOpenCategories = true;
  }

  closeCategories = () =>{
    this.isOpenCategories = false;
  }

  submenuOpen = (i: number) =>{
    this.submenu[i].subKey = true;
  }

  submenuClose = (i: number) =>{
    this.submenu[i].subKey = false;
  }

  logoutClick = () => {
    this.logoutEvent.emit();
  }

  categoryClick = (categoryname: any) =>{
    this.categoryClickEvent.emit(categoryname);
  }

  subCategoryClick = (subCatName: any) =>{
    this.subCategoryClickEvent.emit(subCatName);
  }

  toggleSearchShow = () =>{
    this.showSearch = !this.showSearch;
    if(this.showSearch){
      setTimeout(()=>{
    this.searchElement.nativeElement.focus();
  },0);  
    }
    this.showSearch ? "" : this.searchTerms = ""
  }

  showSearchTerms = () =>{
    this.searchTerms ? this.router.navigate([`ourproducts`,{term: this.searchTerms}]): '';
    this.searchTerms = this.searchTerms ? '': this.searchTerms
    this.showSearch = !this.showSearch
  }  

}

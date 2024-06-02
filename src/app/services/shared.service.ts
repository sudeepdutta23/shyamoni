import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private subject = new Subject<any>();
  private subject2 = new Subject<any>();
  private AddressId = new Subject<any>();
  private cartPageUpdate = new Subject<any>();
  private checkCartUpdate = new Subject<any>();
  private cartIconUpdate = new Subject<any>();
  private hidemobilenav = new Subject<any>();
  private catSubcatClick = new Subject<any>();
  private getOrderData = new Subject<any>();
  private updateMiniCart = new Subject<any>();
  private updateTopNavBarOnSignup = new Subject<any>();
  private paymentClosedOnError = new Subject<any>();

  //Address Updation
  sendClickEvent = (value: any) =>{
    this.subject.next(value)
  }

  getClickEvent = () =>{
    return this.subject.asObservable();
  }
  
  // Cart Click Updation
  sendCartClickEvent = () =>{
    this.subject2.next(0);
  }

  getCartClickEvent = () =>{
    return this.subject2.asObservable();
  }

  //cart icon update
  addTocartClicked = () =>{
    this.cartIconUpdate.next(0);
  }

  getIconUpdated = () =>{
    return this.cartIconUpdate.asObservable();
  }

  //Passing address from address to checkout
  sendAddressSelectEvent = (id: any) =>{
    this.AddressId.next(id);
  }

  getAddressSelectEvent = () =>{
    return this.AddressId.asObservable();
  }

  //Update cart page after payment
  sendCartUpdateEvent = () =>{
    this.cartPageUpdate.next(0);
  }

  
  getCartUpdateEvent = () =>{
    return this.cartPageUpdate.asObservable();
  }
  // Navigate from checkout to cart

  checkCartNavigate = () =>{
    this.checkCartUpdate.next(0);
  }

  navigateToCart = () =>{
    return this.checkCartUpdate.asObservable();
  }

  hideMobileNavbar = () =>{
   this.hidemobilenav.next(0)
  }

  getHideNavbar = () =>{
    return this.hidemobilenav.asObservable()
  }

  getShipptingStatus = (data: object) =>{
    this.getOrderData.next(data);
  }

  showShippingStatus = () =>{
    return this.getOrderData.asObservable();
  }

  updatingMiniCartData = () =>{
    this.updateMiniCart.next(0)
  }

  showNewMiniCArtData = () =>{
    return this.updateMiniCart.asObservable();
  }

  updatingTopNavData = () =>{
    this.updateTopNavBarOnSignup.next(0);
  }

  showNewTopNavData = () =>{
    return this.updateTopNavBarOnSignup.asObservable();
  }

  updatingCartOnPaymentError = () =>{
    this.paymentClosedOnError.next(0);
  }

  showCartOnPaymentError = () =>{
    return this.paymentClosedOnError.asObservable();
  }

  constructor() { }
}

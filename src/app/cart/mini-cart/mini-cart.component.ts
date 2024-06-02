import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/Interfaces/Cart';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css']
})
export class MiniCartComponent implements OnInit { 
  public totalAmount = 0;
  public totalWeight = 0;

  public totalGstPrice: number = 0;
  public totalDeliveryCharge: number = 0;

  public cart!: Cart[];

  constructor(private userservice: UserService, private sharedservice: SharedService) { }
 
  ngOnInit(): void {
    this.getCartItems();
    this.sharedservice.showNewMiniCArtData().subscribe((data)=>{
      this.getCartItems();
    })
  }

  getCartItems = () => {
    this.totalAmount = 0;
    this.totalWeight = 0;
    this.userservice.fetchCartItems().subscribe(({ data, error }) => {
      this.cart = data;
      this.cart.forEach((val: any) => {
        this.totalAmount += val?.pieces * val?.product_weight?.specialPrice;
        this.totalWeight += val?.pieces * val?.product_weignt?.weight;
        this.totalDeliveryCharge += val.product_weight.deliveryCharge;
        this.totalGstPrice += (val?.pieces * (val.product_weight.specialPrice* (val.product_weight.gst/100) ))
      });
    });
  };

}

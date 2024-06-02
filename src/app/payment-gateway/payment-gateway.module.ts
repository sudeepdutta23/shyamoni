import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { InstamojoComponent } from './instamojo/instamojo.component';



@NgModule({
  declarations: [
    RazorpayComponent,
    InstamojoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RazorpayComponent,
    InstamojoComponent
  ]
})
export class PaymentGatewayModule { }

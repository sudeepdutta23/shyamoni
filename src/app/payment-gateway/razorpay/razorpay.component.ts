import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WindowRefService } from 'src/app/services/window-ref.service';
import { environment } from 'src/environments/environment';

declare var Razorpay: any;

@Component({
  selector: 'app-razorpay',
  template: '',
  styles: ['']
})
export class RazorpayComponent implements OnInit {

  public orderId: any;

  public shyamoniOrderId: any;

  @Output() paymentClose = new EventEmitter<any>();

  @Output() paymentSuccess = new EventEmitter<any>();

  paymentModalClose = () => this.paymentClose.emit({ razorpay_order_id: this.orderId, shyamoni_order_id: this.shyamoniOrderId });

  paymentCapture = (res: any) => this.paymentSuccess.emit(res);

  payOnline = (transaction: any) =>{
    this.userservice.userPayment(transaction).subscribe(({error, data: {getUserPrefillDetails, orderResponse}})=>{
      if(!error){
        this.RAZORPAY_OPTIONS.prefill.name = getUserPrefillDetails.name;
        this.RAZORPAY_OPTIONS.prefill.email = getUserPrefillDetails.email;
        this.RAZORPAY_OPTIONS.prefill.contact = getUserPrefillDetails.phoneNo;
        this.RAZORPAY_OPTIONS.amount = orderResponse.amount;
        this.RAZORPAY_OPTIONS.order_id = orderResponse.order_id;
        this.orderId = orderResponse.order_id;
        this.shyamoniOrderId = orderResponse.shyamoni_order_id
        const rzp1 = new this.winRef.nativeWindow.Razorpay(this.RAZORPAY_OPTIONS);
  
        rzp1.open();
      }
    })
  }

  RAZORPAY_OPTIONS = {
    "key": environment.razorpay.key,
    "secret": environment.razorpay.secret,
    "amount": "",
    "name": "Shyamoni",
    "order_id": "",
    // "description": "Shyamoni Transaction",
    "image": "https://shyamoni.com/client/assets/img/logo/Shyamoni_BWLogo.jpg",
    "handler": this.paymentCapture.bind(this),
    "prefill": {
      "name": "",
      "email": "",
      "contact": "",
    },
    "notes": {
      "address": "Razorpay Corporate Office",
    },
    "modal": {
      "escape": false,
      "ondismiss": () => this.paymentModalClose(),
      "animaton": true,
      "confirm_close": true,
      "handleback": true,
      "backdropclose": true
    },
    "theme": {
      "color": "#ED2353",
    }
  };

  constructor(private userservice: UserService, private winRef: WindowRefService) { }

  ngOnInit(): void {
  }

}

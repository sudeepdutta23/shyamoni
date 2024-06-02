import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { title } from 'process';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from '../common/notification/notification.component';
import { Cart } from '../Interfaces/Cart';
import { InstamojoComponent } from '../payment-gateway/instamojo/instamojo.component';
import { RazorpayComponent } from '../payment-gateway/razorpay/razorpay.component';
import { SharedService } from '../services/shared.service';
import { UserService } from '../services/user.service';
import { WindowRefService } from '../services/window-ref.service';

// declare var Razorpay: any;

interface Transaction {
  product: string;
  pieces: number;
  productName: string;
  price: number;
  product_weight: number;
  cart_id: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public addressForm!: FormGroup;
  public addAddressForm!: FormGroup;

  public cart!: Cart[];
  public numberOfItems: any = 1;
  public totalAmount = 0;
  public totalWeight = 0;

  public address: any = []
  public totalAddress: any;

  public states: any;
  public cities: any;

  transactions: any;

  public shyamoniOrderId: any;
  public orderId: any;
  public addressId: any;
  public paymentOngoing = false;

  public totalGstPrice: number = 0;
  public totalDeliveryCharge: number = 0;

  public isEditAddress: Boolean = false;
  public idEditOrderId: any;

  public disablePaymentBtn = false;

  public env = environment;

  @ViewChild(RazorpayComponent)
  private razorpy!: RazorpayComponent;

  @ViewChild(InstamojoComponent)
  private instamojo!: InstamojoComponent

  constructor(
    private userservice: UserService,
    private notif: NotificationComponent,
    private sharedservice: SharedService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private winRef: WindowRefService,
    private zone: NgZone
  ) { }

  ngOnInit(): void {
    document.title = `cart`;
    // document.getElementsByTagName('title')[0].remove()
    this.reloadApi();
    this.addressForm = this.fb.group({
      selectedAddress: [null]
    })



    this.addAddressForm = this.fb.group({
      address_line_1: [null, Validators.required],
      address_line_2: [null, Validators.required],
      cityID: [null, Validators.required],
      district: [null, Validators.required],
      stateID: [null, Validators.required],
      country: [{ value: 'India', disabled: true }, Validators.required],
      zip: [null, Validators.required],
    });

    this.getCartItems();
    this.getAddress();
    this.getStates()
    // this.getCitiesOnInit()
    this.sharedservice.showCartOnPaymentError().subscribe((onPaymentError: any) => {
      this.disablePaymentBtn = false;
      this.closeCheckoutModal();
      this.getCartItems()
    })
  }

  reloadApi = () => this.userservice.reloadApi().subscribe((res) => {})
 

  getCartItems = () => {
    this.spinner.show();
    this.totalAmount = 0;
    this.totalWeight = 0;
    this.userservice.fetchCartItems().subscribe(({ data, error }) => {
      this.cart = data;
      this.cart.forEach((val: any) => {
        this.totalAmount += (val?.pieces * val?.product_weight?.specialPrice);
        this.totalWeight += val?.pieces * val?.product_weight?.weight;
        this.totalDeliveryCharge += val?.pieces * val.product_weight.deliveryCharge;
        this.totalGstPrice += (val?.pieces * (val.product_weight.specialPrice * (val.product_weight.gst / 100)))
      });
      this.sharedservice.addTocartClicked();
      this.spinner.hide();
    });
  };

  addItem = (index: number, pieces: number) => {
    this.totalAmount = 0;
    this.totalWeight = 0;
    let stock = +this.cart[index]?.availableStock;
    if (stock < this.cart[index]?.pieces + 1) {
      this.notif.showInfo('This product is out of stock');
    } else {
      if (
        this.cart[index]?.product_weight.weight * (this.cart[index]?.pieces + 1) >
        2000
      ) {
        this.notif.showInfo(
          'Cannot add more than 2kg product!!Please try another order'
        );
      } else {
        this.cart[index].pieces = +this.cart[index]?.pieces + 1;
      }
    }
    this.cart.forEach((val: any) => {
      this.totalAmount += val?.pieces * val?.product_weight?.specialPrice;
      this.totalWeight += val?.pieces * parseInt(val?.product_weignt?.weight);
      this.totalDeliveryCharge += val?.pieces * parseInt(val.product_weight.deliveryCharge);
      this.totalGstPrice += val?.pieces * (val.product_weight.specialPrice * (val.product_weight.gst / 100))
    });
  };
  removeItem = (index: number, pieces: number) => {
    this.totalAmount = 0;
    this.totalWeight = 0;
    this.cart[index]?.pieces < 2
      ? this.notif.showInfo(
        'Product quantity cannot be less than 1', 'Please select atleast 1'
      )
      : (this.cart[index].pieces = pieces - 1);
    this.cart.forEach((val: any) => {
      this.totalAmount += val?.pieces * val?.product_weight?.specialPrice;
      this.totalWeight += val?.pieces * parseInt(val?.product_weignt?.weight);
      this.totalDeliveryCharge += val?.pieces * parseInt(val.product_weight.deliveryCharge);
      this.totalGstPrice += (val?.pieces * (val.product_weight.specialPrice * (val.product_weight.gst / 100)))
    });
  };

  removeItemFromCart = (id: any) => {
    this.userservice.removeItemFromCart(id).subscribe(({ error, data }) => {
      this.totalAmount = 0;
      this.totalWeight = 0;
      this.totalDeliveryCharge = 0;
      this.totalGstPrice = 0;
      this.notif.showSuccess(data);
      this.getCartItems();
    });
    this.sharedservice.addTocartClicked();
  };

  openCheckoutModal = () => {
    $('#checkout-modal').addClass('in');
    $('#checkout-modal').css('display', 'block');
    document.body.style.overflow = "hidden"
    document.body.style.height = "100%";
    console.log(document.body.clientWidth);

  }

  closeCheckoutModal = () => {
    $('#checkout-modal').removeClass("in");
    $('#checkout-modal').css('display', 'none');
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
  }

  openAddressModal = () => {
    $('#address-modal').addClass('in');
    $('#address-modal').css('display', 'block');
  }

  closeAddressModal = () => {
    $('#address-modal').removeClass("in");
    $('#address-modal').css('display', 'none')
    this.resetForm()
  }


  getAddress = () => {
    this.userservice.getAddress().subscribe(({ error, data }) => {
      this.address = data;
      this.totalAddress = data.length;

      if (data?.length > 0) {
        this.addressForm.get('selectedAddress')?.setValue(data[0]?.id);
      }
    });
  }

  deleteAddress = (id: any) => {
    this.userservice.deleteAddress(id).subscribe(({ error, data }) => {
      this.notif.showSuccess(data)
      this.getAddress();
    })
  }


  // getCitiesOnInit = async() =>{
  //   const {data : datas, error} = await lastValueFrom(this.userservice.fetchCity(this.data[0]?.stateID));
  //   this.cities = datas;
  // }

  getStates = async () => {
    const { data: datas, error } = await lastValueFrom(this.userservice.fetchState());
    this.states = datas;
  }
  getCities = (e: any) => {
    this.userservice.fetchCity(e.target.value).subscribe(({ data, error }) => {
      this.cities = data;
    })
  }

  getCitiesFromEdit = (e: any, address: any) => {
    this.userservice.fetchCity(e).subscribe(({ data, error }) => {
      this.cities = data;
      this.addAddressForm.patchValue(address);
    })
  }


  addAddress = () => {
    if (this.addAddressForm.valid)
      this.userservice
        .addAddress(this.addAddressForm.getRawValue())
        .subscribe(({ error, data }) => {
          this.notif.showSuccess(data);
          this.getAddress();
          this.closeAddressModal()
        });
  };

  changeSelectedAddress = (addressId: any) => {
    this.addressForm.get('selectedAddress')?.setValue(addressId)
  }

  paymentCapture = async (response: any) => {
    if (this.env.paymentGateway == "Razorpay") {
      this.spinner.show()
      const body = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        shyamoni_order_id: this.shyamoniOrderId
      }
      await this.userservice.userPaymentSuccess(body).subscribe(({ error, data }) => {
        if (!error) {
          this.zone.run(() => {
            this.disablePaymentBtn = false;
            this.notif.showSuccess(data);
            this.spinner.hide()
            this.sharedservice.addTocartClicked();
            this.cart = [];
            this.totalAmount = 0;
            this.totalWeight = 0;
            this.totalDeliveryCharge = 0;
            this.totalGstPrice = 0;
            this.closeCheckoutModal();
          })
        }
      })
    } else if (this.env.paymentGateway == "Instamojo") {
      this.zone.run(() => {
        this.notif.showSuccess(`Instamojo Payment Success ${JSON.stringify(response)}`);
      })
    }
  }

  paymentModalClose = (response: any) => {
    if (this.env.paymentGateway == "Razorpay") {
      let body = { cancel: 'cancel', razorpay_order_id: response.razorpay_order_id, shyamoni_order_id: response.shyamoni_order_id }
      $('body').css('overflow', 'visible !important');
      this.userservice.userPaymentSuccess(body).subscribe(({ error, data }) => {
        if (!error) {
          this.zone.run(() => {
            this.notif.showError(data);
            this.disablePaymentBtn = false;
          })
        }
      })
    } else if (this.env.paymentGateway == "Razorpay") {
      this.zone.run(() => {
        this.notif.showSuccess(`Instamojo Payment Failed`);
      })
    }
  }

  // RAZORPAY_OPTIONS = {
  //   "key": environment.razorpay.key,
  //   "secret": environment.razorpay.secret,
  //   "amount": "",
  //   "name": "Shyamoni",
  //   "order_id": "",
  //   // "description": "Shyamoni Transaction",
  //   "image": "https://shyamoni.com/client/assets/img/logo/Shyamoni_BWLogo.jpg",
  //   "handler": this.paymentCapture.bind(this),
  //   "prefill": {
  //     "name": "",
  //     "email": "",
  //     "contact": "",
  //   },
  //   "notes": {
  //     "address": "Razorpay Corporate Office",
  //   },
  //   "modal": {
  //     "escape": false,
  //     "ondismiss": () => this.paymentModalClose(),
  //     "animaton": true,
  //     "confirm_close": true,
  //     "handleback": true,
  //     "backdropclose": true
  //   },
  //   "theme": {
  //     "color": "#ED2353",
  //   }
  // };



  payWithRazorpay = () => {

    let Body: any = [];
    if (!this.addressForm.get('selectedAddress')?.value) {
      this.notif.showInfo('Please Add Address')
    } else {
      this.paymentOngoing = true;
      Body[0] = { 'address_id': this.addressForm.get('selectedAddress')?.value }
      Body[1] = this.transactions;
      // this.razorpy.payOnline(Body);
      // this.env.paymentGateway == "Razorpay" ? this.razorpy.payOnline(Body) : this.env.paymentGateway == "Instamojo" ? this.instamojo.payOnline() : null
      this.razorpy.payOnline(Body)
      // this.userservice.userPayment(Body).subscribe(({error, data: {getUserPrefillDetails, orderResponse}})=>{
      //   if(!error){

      //     this.RAZORPAY_OPTIONS.prefill.name = getUserPrefillDetails.name;
      //     this.RAZORPAY_OPTIONS.prefill.email = getUserPrefillDetails.email;
      //     this.RAZORPAY_OPTIONS.prefill.contact = getUserPrefillDetails.phoneNo;
      //     this.RAZORPAY_OPTIONS.amount = orderResponse.amount;
      //     this.RAZORPAY_OPTIONS.order_id = orderResponse.order_id;
      //     this.orderId = orderResponse.order_id;
      //     this.shyamoniOrderId = orderResponse.shyamoni_order_id
      //     const rzp1 = new this.winRef.nativeWindow.Razorpay(this.RAZORPAY_OPTIONS);

      //     rzp1.open();
      //   }
      // })
    }
    // this.sharedservice.sendCartUpdateEvent()
    // this.sharedservice.sendCartClickEvent()
    // this.paymentOngoing = false
  }

  checkout = () => {
    this.disablePaymentBtn = true;
    let inactiveFound = false;
    let array = this.cart
    array.forEach((val) => {
      if (val?.product?.product_status == 0) {
        this.notif.showInfo(`${val.product.productName} is not available!! Please remove this from cart to continue`)
        inactiveFound = true
      }
    })
    if (!inactiveFound) {
      const cartObj = array.map((element: any, index: any) => {
        const container = { cart_id: '', product: '', productName: '', pieces: '', price: '', product_weight: '', product_weight_id: '', product_image: '', deliveryCharge: '', gst: '' };
        container.product = element?.product_id;
        container.pieces = element?.pieces
        container.productName = element?.product.productName
        container.price = element?.product_weight?.specialPrice
        container.product_weight = element?.product_weight?.weight
        container.product_weight_id = element?.product_weight?.id
        container.cart_id = element?.id
        container.product_image = element?.ImagePath
        container.deliveryCharge = element?.product_weight?.deliveryCharge
        container.gst = element?.product_weight?.gst
        return container
      });

      if (cartObj) {
        // this.showcartItems = false;
        // this.showcheckoutItems = true;
        this.transactions = cartObj
      }


      // cartObj.map((val: any) => {
      //   const container = { productName: '', cost: '', pieces: '' };
      //   container.productName = val.productName;
      //   container.cost = val.price;
      //   container.pieces = val.pieces;
      //   return container;
      // });
    }
    // this.cartForm.get('checkoutObject')?.setValue(cartObj)
    // this.modal.open(CheckoutComponent,this.cartForm.get('checkoutObject')?.value,this.config)
    // this.router.navigateByUrl('/checkout', { state: cartObj });

    this.payWithRazorpay()
  }

  editAddress = (address: any) => {

    this.isEditAddress = true;
    this.getCitiesFromEdit(address.stateID, address);

    this.openAddressModal();
    this.addAddressForm.get('stateID')?.setValue(address.city_name);
    this.idEditOrderId = address.id
  }

  openAddAddress = () => {
    this.isEditAddress = false;
    this.openAddressModal()
  }

  editAddressSubmit = () => {
    this.userservice.updateAddress(this.idEditOrderId, this.addAddressForm.getRawValue()).subscribe(({ error, data }) => {
      this.getAddress()
      this.notif.showSuccess(data)
      this.closeAddressModal();
      this.isEditAddress = false
    })
  }

  resetForm = () => {
    this.addAddressForm.reset({
      address_line_1: '',
      address_line_2: '',
      city: '',
      cityID: null,
      country: 'India',
      district: '',
      id: null,
      state: '',
      stateID: null,
      zip: null,
    })
    // this.addAddressForm.patchValue({
    //   address_line_1:'',
    //   address_line_2: '',
    //   city:'',
    //   cityID: null,
    //   country: 'India',
    //   district: '',
    //   id: null,
    //   state: '',
    //   stateID: null,
    //   zip: null,
    // })
    this.isEditAddress = false;
    this.idEditOrderId = null;
  }

  setDefault = (e: any) => {
    e.target.src = this.env.defaultAvataar;
  }


}

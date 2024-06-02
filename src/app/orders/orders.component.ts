import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Modal } from '../core/ui/dialogs/modal.service';
import { ShippingStepsComponent } from '../shipping-steps/shipping-steps.component';
import { NotificationComponent } from '../common/notification/notification.component';
import { SharedService } from '../services/shared.service';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  public orderDetails: any;
  public productDetails: any;
  public combinedDetails: any;
  width = { width: '700px' };
  public innerWidth: any;
  // public gstPercent = environment.gstPercentage;
  // public shyamoniLogo = environment.shyamoni_main_logo;

  public env = environment;

  public gstPercent: any;

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}

  constructor(
    private userservice: UserService,
    private router: Router,
    private modal: Modal,
    private notif: NotificationComponent,
    private shareservice: SharedService,
    private spinner: NgxSpinnerService,
    private adminservice: AdminService
  ) {}

  ngOnInit(): void {
    document.title = "My Orders"
    this.userservice.getGstValue().subscribe(({data, error})=>{
      if(!error){
        this.gstPercent = data?.gst;
      }
    })
    this.getAllOrders();
    this.innerWidth = window.innerWidth;
  }

  getAllOrders = () => {
    this.spinner.show()
    this.userservice.getAllOrders().subscribe(({ error, data }) => {
      
      data.forEach((val: any, i: any)=>{
        val.getOrderDetailsByID.awb_id ? data[i].getOrderDetailsByID.awbUrl = `https://shiprocket.co//tracking/${data[i].getOrderDetailsByID.awb_id}` : null
      })
      this.orderDetails = data;
      this.spinner.hide()
    });
  };

  getIndividualOrderDetails = (orderId: any) => {
    this.userservice
      .getOrderDetailsByID(orderId)
      .subscribe(({ error, data }) => {
        this.orderDetails = data.getOrderDetailsByID;
        this.productDetails = data.getProductDetails;
        this.combinedDetails = data;
      });
  };

  openAddressModal = (orderId: any) => {
    this.getIndividualOrderDetails(orderId);
    $('#order-details-modal').addClass('in');
    $('#order-details-modal').css('display', 'block');
  };

  closeOrderDetailsModal = () => {
    $('#order-details-modal').removeClass('in');
    $('#order-details-modal').css('display', 'none');
  };

  navigateInvoicePage = (orderId: any) => {
    // this.router.navigate([`invoice/${orderId}`]);
    this.spinner.show()
    this.userservice.getInvoiceById(orderId).subscribe((res)=>{
      // let file = new Blob([res])
      let blob = new Blob([res], { type: "application/pdf" });
      let url = window.URL.createObjectURL(blob);
      this.spinner.hide()
      let pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
          alert( 'Please disable your Pop-up blocker and try again.');
      }
      
    })
  };

  shippingModal = (orderData: Object) => {
    this.modal.open(ShippingStepsComponent, orderData, this.width);
    this.shareservice.getShipptingStatus(orderData);
  };

  cancelSingleOrder = (orderID : String) =>{
    this.spinner.show()
    this.userservice.cancelOrder(orderID).subscribe(({ data, error })=>{
      if(!error){
        this.spinner.hide()
        this.getAllOrders();
        this.notif.showSuccess(data)
      }
    })
  }
}

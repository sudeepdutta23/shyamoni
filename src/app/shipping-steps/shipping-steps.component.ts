import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shipping-steps',
  templateUrl: './shipping-steps.component.html',
  styleUrls: ['./shipping-steps.component.css']
})
export class ShippingStepsComponent implements OnInit {
  isLinear = true;
  public shippingStatus = 1;
  public stepIndex = 0;
  public trackingDetails: any;
  public finalStatusIndex: any;

  constructor(

    private fb: FormBuilder,
    private userservice: UserService,
    private cdr: ChangeDetectorRef,
    private sharedservice: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.sharedservice.showShippingStatus().subscribe((data)=>{
      this.trackOrderDetailsByAWB(data?.awb_id);
    });
  }

  trackOrderDetailsByAWB = (awbId: any) => {
    this.userservice.trackOrderDetailsByAWB(awbId).subscribe(
      ({
        data: {
          trackOrder: { data },
        },
      }) => {
        let status: any;
        Object.values(data).some((data)=>{
          status = data
        })
        this.trackingDetails = status?.scan_details;
        this.shippingStatus = status?.current_status;
         this.trackingDetails.forEach((element: any, index: any) => {
          if(element.status == this.shippingStatus){
            this.finalStatusIndex = index;
          }
        });
      }
    );
  };

}

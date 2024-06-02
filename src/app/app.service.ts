import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NotificationComponent } from './common/notification/notification.component';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  headers: any;
  constructor(
    private http: HttpClient,
    private notif: NotificationComponent,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sharedservice: SharedService
  ) { }

  getHttpHeader(userType: string, formDataHeader = false) {
    let headers = {
      headers: !formDataHeader
        ? new HttpHeaders({
            'Content-Type': 'application/json; charset=UTF-8',
            Authorization: userType == 'user' ? `Bearer ${localStorage.getItem('userToken')}` : userType == 'admin' ? `Bearer ${localStorage.getItem('adminToken')}` : '',
          })
        : new HttpHeaders({
            Authorization: userType == 'user' ? `Bearer ${localStorage.getItem('userToken')}` : userType == 'admin' ? `Bearer ${localStorage.getItem('adminToken')}` : '',
          }),
    };
    return headers;
  }

  handleError = (errorResponse: HttpErrorResponse) => {
    console.log("===========",errorResponse);
    if(errorResponse?.url?.includes('paymentSuccess') && !errorResponse?.ok){
        $('body').css('overflow', 'visible !important');
        this.sharedservice.updatingCartOnPaymentError();
        this.sharedservice.addTocartClicked();          
        alert("Oops..!"+"Payment Failed");
    }
    else if (
      errorResponse?.error?.data[`${Object.keys(errorResponse?.error?.data)}`]
        ?.length > 0
    ) {
      errorResponse?.error?.data[
        `${Object.keys(errorResponse?.error?.data)}`
      ]?.map((i: any) => {
        this.notif.showError(i || 'Something Goes Wrong', 'Error');
      });
    } else {
      if(errorResponse?.url?.includes('fetchSingleProduct') && errorResponse.status == 404){
        this.router.navigate(['/home']);
        this.notif.showError(
          errorResponse?.error?.data || 'Something Goes Wrong',
          'Error'
        );
      }else if(errorResponse.error.status_code === 1000 && (errorResponse.url?.includes('Admin') || errorResponse.url?.includes('Admin'))){
        localStorage.removeItem("adminToken");
        this.router.navigate(['/admin']);
      }else if(errorResponse.error.status_code === 1000 && (!errorResponse.url?.includes('Admin') || !errorResponse.url?.includes('Admin'))){
        localStorage.removeItem("userToken");
        this.sharedservice.updatingTopNavData();
        this.router.navigate(['/home']);
      }else{
        this.notif.showError(
          errorResponse?.error?.data || 'Something Goes Wrong',
          'Error'
        );
      }
    }
    try {
      this.spinner.hide();
    } catch (e) {}

    return throwError('Something Goes Wrong');
  };
}

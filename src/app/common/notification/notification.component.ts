import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationComponent {

  constructor(
    private toaster: ToastrService
  ) { }

  showSuccess = (body: string, title : string = "Success") => {
    this.toaster.success(title, body);
  }

  showError = (body: string = "Something goes wrong! Try again later!", title : string = "Error") => {
    this.toaster.error(title, body);
  }

  showInfo = (body: string, title : string = "Info") => {
    this.toaster.info(title, body);
  }

}

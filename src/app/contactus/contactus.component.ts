import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from '../common/notification/notification.component';
import { UserService } from '../services/user.service';
import { Errors } from '../utils/Errors';
import { onValueChanged } from '../utils/FormValueChange';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  mailForm!: FormGroup;
  public loading= false;
  formErrors: any = Errors;
  public env = environment;

  constructor(
    private fb: FormBuilder,
    private userservice: UserService,
    private notif: NotificationComponent,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    document.title =`Contact Us`;
    this.mailForm = this.fb.group({
      name: [null, [Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      comment: [null, [Validators.required,,Validators.minLength(15)]]
    })
    this.mailForm.valueChanges.subscribe((data)=>{      
      onValueChanged(this.mailForm,this.formErrors,data)
    });
    onValueChanged(this.mailForm, this.formErrors); // (re)set validation messages now
  }

  sendMail = () =>{
    this.loading = true;
    this.spinner.show()
    this.userservice.sentContactMail(this.mailForm.value).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess(data);
        this.mailForm.reset();
        this.loading = false;
        this.spinner.hide()
      }
    })
  }

}

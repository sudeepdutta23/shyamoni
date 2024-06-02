import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from '../common/notification/notification.component';
import { UserService } from '../services/user.service';
import { Errors } from '../utils/Errors';
import { onValueChanged } from '../utils/FormValueChange';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  public forgetPasswordForm!: FormGroup;
  public passwordChangeForm!: FormGroup;
  formErrors: any = Errors;
  public env = environment;

  public isMailSent: boolean = false;
  public isOTPVerified: boolean = false;
  public IsSubmitFPBtnDisbled = false;
  public visibility = 'visibility_off';
  public passtype = 'password';
  public cVisibility = 'visibility_off';
  public cPasstype = 'password';
  public resetPassBtn = false;
  public resendClick = false;
  public timerCount = 30;
  passAndCpassSame: boolean = false;
   OTP = new FormControl('');

  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private notif: NotificationComponent,
    private router: Router
  ) { }

  forgetPassword = () =>{
    this.IsSubmitFPBtnDisbled = true;
    if(this.forgetPasswordForm.valid){

      this.userservice.forgetPassword(this.forgetPasswordForm?.value).subscribe(({ error, data}) =>{
        if(!error){
          this.notif.showSuccess(data);
          this.isMailSent = true;
          this.IsSubmitFPBtnDisbled = true;
          this.resendClick = false
        }else{
          this.isMailSent = false;
          this.notif.showError(data)
          this.resendClick = false
          this.IsSubmitFPBtnDisbled = false;
        }
      })
    }
  }

  submitOTP = () =>{
    let body = {
      email: this.forgetPasswordForm.get('email')?.value,
      userOTP: this.OTP.value
    }
    this.userservice.verifyOTP(body).subscribe(({error, data})=>{
      if(!error && data){
        this.isOTPVerified = true
        this.notif.showSuccess("Otp Verified")
      }else{
        this.isOTPVerified = false;
      }
      
    })
  }

  resetPassword = () =>{
    this.resetPassBtn = !this.resetPassBtn;
      let body = {
        email: this.forgetPasswordForm.get('email')?.value,
        userOTP: this.OTP.value,
        ...this.passwordChangeForm.value
      }
      this.userservice.resetPassword(body).subscribe(({error, data})=>{
        if(!error){
          this.notif.showSuccess(`${data}! Please login to continue`);
          this.router.navigate(['home'])
        }
        this.resetPassBtn = !this.resetPassBtn
      })
  }

  ngOnInit(): void {
    document.title =`Forget Password`;
    this.forgetPasswordForm = this.fb.group({
      email: [null,[Validators.required, Validators.email]]
    })
    this.forgetPasswordForm.valueChanges.subscribe((data)=>{
      onValueChanged(this.forgetPasswordForm, this.formErrors, data)
    })
    onValueChanged(this.forgetPasswordForm, this.formErrors); // (re)set validation messages now
    this.passwordChangeForm = this.fb.group({
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g)
        ],
      ],
      cpassword: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g)
        ],
      ],
    },
    {
      validators: this.password.bind(this),
    })
    this.passwordChangeForm.valueChanges.subscribe((data)=>{
      onValueChanged(this.passwordChangeForm,this.formErrors,data)
    })
    onValueChanged(this.passwordChangeForm, this.formErrors); // (re)set validation messages now
  }

  password = (formGroup: FormGroup) => {
    return this.passAndCpassSame = formGroup.get('password')?.value === formGroup.get('cpassword')?.value ? true : false;
  };

  changePassIcon = (passFieldNo: number) => {
    switch(passFieldNo){
      case 1:
        this.visibility = this.visibility == 'visibility_off' ? 'visibility_on' : 'visibility_off';
        this.passtype = this.visibility == 'visibility_off' ? 'password' : 'text';
        break;
      case 2:
        this.cVisibility = this.cVisibility == 'visibility_off' ? 'visibility_on' : 'visibility_off';
        this.cPasstype = this.cVisibility == 'visibility_off' ? 'password' : 'text';
        break;
      default:
        break;
    }
  };

  timer = () =>{
   let refreshIntervalId =  setInterval(()=>{
      if(this.resendClick){
      if(this.timerCount>0){
        this.timerCount--;
      }else{
        this.timerCount = 0;
      }
    }else{
      clearInterval(refreshIntervalId);
      this.timerCount = 30;
    }
    },1000)
  }

}

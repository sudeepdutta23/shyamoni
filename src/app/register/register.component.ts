import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationComponent } from '../common/notification/notification.component';
import { UserService } from '../services/user.service';
import { Errors } from '../utils/Errors';
import { onValueChanged } from '../utils/FormValueChange';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public signUpForm!: FormGroup;
  public visibility = 'visibility_off';
  public visibility2 = 'visibility_off';
  public passtype = 'password';
  public passtype2 = 'password';
  isLoading = false;
  passAndCpassSame: boolean = false;
  public env = environment;

  formErrors: any = Errors;

  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private notif: NotificationComponent,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sharedservice: SharedService
  ) {}

  ngOnInit(): void {
    document.title =`Sign Up`;
    this.signUpForm = this.fb.group(
      {
        name: [null, Validators.required],
        email: [null, [Validators.required, Validators.email]],
        phoneNo: [
          null,
          [Validators.required, Validators.pattern(/^[6-9]\d{9}$/),Validators.minLength(10),Validators.maxLength(10)
        ]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g),
          ],
        ],
        cpassword: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g),
          ],
        ],
      },
      {
        validators: this.password.bind(this),
      }
    );

    this.signUpForm.valueChanges.subscribe((data) => {
      onValueChanged(this.signUpForm, this.formErrors, data);
    });

    onValueChanged(this.signUpForm, this.formErrors); // (re)set validation messages now
  }

  password = (formGroup: FormGroup) => {
    return (this.passAndCpassSame =
      formGroup.get('password')?.value === formGroup.get('cpassword')?.value
        ? true
        : false);
  };

  changePassIcon = (i: number) => {
    switch (i) {
      case 1:
        this.visibility =
          this.visibility == 'visibility_off'
            ? 'visibility_on'
            : 'visibility_off';
        this.passtype =
          this.visibility == 'visibility_off' ? 'password' : 'text';
        break;
      case 2:
        this.visibility2 =
          this.visibility2 == 'visibility_off'
            ? 'visibility_on'
            : 'visibility_off';
        this.passtype2 =
          this.visibility2 == 'visibility_off' ? 'password' : 'text';
        break;
      default:
        break;
    }
  };

  signUp = () => {
    this.isLoading = true;
    if (!this.passAndCpassSame)
      return this.notif.showError('Password and confirm password not match');
    if (this.signUpForm.valid) {
      this.spinner.show();
      this.userservice
        .signUp(this.signUpForm.value)
        .subscribe(({ error, data }) => {
          this.notif.showSuccess('Successfully Logged In');
          this.isLoading = false;
          localStorage.setItem('userToken', data.token);
          this.spinner.hide();
          this.signUpForm.reset();
          this.router.navigate(['home']);
          this.sharedservice.updatingTopNavData();
        });
    }
  };
}

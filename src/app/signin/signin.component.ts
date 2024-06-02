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
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public signInForm!: FormGroup;
  public visibility = 'visibility_off';
  public passtype = 'password';

  public formErrors: any = Errors;
  public loading : Boolean = false;
  public env = environment;

  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private notif: NotificationComponent,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sharedservice: SharedService
  ) { }

  ngOnInit(): void {
    document.title =`Sign In`;
    this.signInForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/g)
        ],
      ],
    });

    this.signInForm.valueChanges.subscribe((data) =>
      onValueChanged(this.signInForm, this.formErrors, data)
    );

    onValueChanged(this.signInForm, this.formErrors); // (re)set validation messages now
  }

  changePassIcon = () => {
    this.visibility = this.visibility == 'visibility_off' ? 'visibility_on' : 'visibility_off';
    this.passtype = this.visibility == 'visibility_off' ? 'password' : 'text';
  };

  signin = () => {
    if (this.signInForm.valid) {
      this.spinner.show();
      this.userservice
        .signin(this.signInForm.value)
        .subscribe(({ error, data }) => {
          this.notif.showSuccess('User Successfully Logged In');
          localStorage.setItem('userToken', data.token);
          this.spinner.hide();
          this.router.navigate(['home']);
          this.sharedservice.addTocartClicked();
          this.sharedservice.updatingTopNavData();
        });
    }
  };

}

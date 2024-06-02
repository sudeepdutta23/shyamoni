import { Errors } from './../utils/Errors';
import { onValueChanged } from './../utils/FormValueChange';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ AdminService ]
})
export class AdminComponent implements OnInit {
  public loginForm! : FormGroup;
  public visibility = 'visibility_off';
  public passtype = 'password';
  formErrors: any = Errors;
  public env = environment;

  constructor(
      private adminservice: AdminService,
      private router: Router,
      private fb : FormBuilder
    ) { 
      if(localStorage.getItem('adminToken')){
        this.router.navigate(['/admin/dashboard/home'])
      }
    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)])],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

    this.loginForm.valueChanges.subscribe(data => onValueChanged(this.loginForm, this.formErrors, data));

    onValueChanged(this.loginForm, this.formErrors);
  }

  loginToAdmin = () =>{
    this.adminservice.adminLogin(this.loginForm.value).subscribe(({ error, data })=>{
      if(data.token != null || data.token != ''){
        localStorage.setItem('adminToken',data.token);
        this.router.navigate(['/admin/dashboard/home'])
      }
    })
  }

  changePassIcon = () => {
    this.visibility = this.visibility == 'visibility_off' ? 'visibility_on' : 'visibility_off';
    this.passtype = this.visibility == 'visibility_off' ? 'password' : 'text';
  };

}

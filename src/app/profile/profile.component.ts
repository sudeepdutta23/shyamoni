import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { NotificationComponent } from '../common/notification/notification.component';
import { UserService } from '../services/user.service';
import { Errors } from '../utils/Errors';
import { onValueChanged } from '../utils/FormValueChange';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileForm!: FormGroup;
  public profileDetails: any;
  public editProfile: Boolean =false;
  public env = environment;

  public formErrors: any = Errors;

  constructor(private userservice: UserService, private fb: FormBuilder, private notif: NotificationComponent, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    document.title =`Profile`;
    this.getProfileInfo();
    this.profileForm = this.fb.group({
      name: [null,Validators.required],
      gender: [null, [Validators.required]],
      dob: [null],
      phoneNo:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
    });

    this.profileForm.valueChanges.subscribe((data) =>
      onValueChanged(this.profileForm, this.formErrors, data)
    );

    this.resetForm()

  }
  
  
  resetForm = () =>{
    onValueChanged(this.profileForm, this.formErrors); // (re)set validation messages now
  }

  getProfileInfo = () =>{
    this.spinner.show()
    this.userservice.getProfileInfo().subscribe(({error,data})=>{
      this.profileDetails = data[0]
      this.profileForm.patchValue(this.profileDetails)
      this.spinner.hide()
    })
  }

  saveProfileInfo = () =>{
    this.spinner.show()
      this.userservice.editProfile(this.profileForm.value).subscribe(({data, error})=>{
        if(!error){
          this.notif.showSuccess(data);
          this.getProfileInfo();
          this.editProfile = !this.editProfile
          this.spinner.hide()
        }
      })
  }

  onSelect = (event: any) =>{
    this.spinner.show()
    let file = event.addedFiles[0];
    const data = new FormData();
    data.append("image", file);
    this.userservice.updateProfile(data).subscribe((data) =>{
       this.getProfileInfo()
       this.spinner.hide()
    })
  }

  setDefault = (e: any) =>{
    e.target.src = this.env.defaultAvataar;
  }
}

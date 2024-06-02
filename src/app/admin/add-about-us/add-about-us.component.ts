import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-about-us',
  templateUrl: './add-about-us.component.html',
  styleUrls: ['./add-about-us.component.css']
})
export class AddAboutUsComponent implements OnInit {
  aboutForm!: FormGroup;
  aboutDetails: any;

  constructor(
    private fb: FormBuilder,
    private adminservice: AdminService,
    private notif: NotificationComponent
    ) { }

  ngOnInit(): void {
    this.getAbout()
    this.aboutForm = this.fb.group({
      about: [null,[Validators.required, Validators.minLength(15)]]
    })


  }

  setAbout = (e : string) => {
    this.aboutForm.controls['about'].setValue(e);
  }


  get about() {
    return this.aboutForm.get('about')?.value
  }


  addAbout = () =>{
    this.adminservice.addAbout(this.aboutForm.value).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess("Added About Successfully")
      }
    })
  }

  getAbout = () =>{
    this.adminservice.getAbout().subscribe(({error, data})=>{
        this.aboutDetails = data;
        this.aboutForm.get('about')?.setValue(data.about);
    })
  }

  editAbout = (id = 1) =>{
    this.adminservice.editAbout(id,this.aboutForm.value).subscribe(({error,data})=>{
      if(!error){
        this.notif.showSuccess("About Us Updated Successfully")
      }
      this.getAbout();
    })
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
export interface PeriodicElement {
  id: string;
  categoryName: string;
  status: string;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-home-banner-add',
  templateUrl: './home-banner-add.component.html',
  styleUrls: ['./home-banner-add.component.css']
})
export class HomeBannerAddComponent implements OnInit {
  bannerForm!: FormGroup;
  public files: File[] = [];
  public displayedColumns: string[] = ['status','delete','image', 'Desc', 'shortDesc'];
  public dataSource = new MatTableDataSource<any>();
  public active: boolean = true;
  public defaultImage = environment.defaultImage;
  public bannerdata = [];
  public midid = "";
  public midheader = "";

  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    private fb: FormBuilder,
    private notif: NotificationComponent,
    private adminservice: AdminService
  ) { }

  toggleSlide(id: any,status: any) {
      status = status == 1? 0: 1
    this.adminservice.updateBannerStatus(id,status).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess(data)
        this.getBannerData()
      }
    })

  }

  ngOnInit(): void {
    this.bannerForm = this.fb.group({
      Desc: [""],
      shortDesc: [""]
    })
    this.getBannerData()
    this.getHomeHeader()
  }

  addBanner = () =>{
    let formData = new FormData();
    formData.append("imagePath",this.files[0])
    formData.append("shortDesc",this.bannerForm.get("shortDesc")?.value)
    formData.append("Desc",this.bannerForm.get("Desc")?.value)
    this.adminservice.addBannerdata(formData).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess(data)
        this.files = [];
        this.getBannerData()
        this.bannerForm.reset()
      }
    })
    
  }

  deleteBanner = (id:any) =>{
    this.adminservice.deleteBanner(id).subscribe(({data, error})=>{
      if(!error){
        this.notif.showSuccess(data)
        this.getBannerData()
      }
    })
  }

  onSelect = (event: any) => {
    this.files = [];
    // this.imageChangedEvent = event;
      this.files.push(...event.addedFiles);
      // const target = event.target as HTMLInputElement;
      // const files = target.files as FileList;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // const imageBlob = this.dataURItoBlob(this.croppedImage)
    // const imageFile = new File([imageBlob],'any', { type: 'image/png'})
    
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  imageLoaded(image: LoadedImage) {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

  onRemove = (event: any) => {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getBannerData = () =>{
    this.adminservice.getBannerData().subscribe(({error,data})=>{
      this.dataSource = new MatTableDataSource<any>(data);
      this.bannerdata = data
    })
  }

  setDefaultImage = (event: any) =>{
    event.target.src = this.defaultImage
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getHomeHeader = () =>{
    this.adminservice.getHeader().subscribe((res)=>{

      this.midid = res.data.id;
      this.midheader = res.data.mid_header
      console.log(res.data); 
    })
  }

  putHomeHeader = () =>{
    this.adminservice.putHeader({id: this.midid, mid_header: this.midheader}).subscribe((res)=>{
      if(!res.error){
        this.notif.showSuccess(res.data)
        this.getHomeHeader()
      }
    })
  }

}

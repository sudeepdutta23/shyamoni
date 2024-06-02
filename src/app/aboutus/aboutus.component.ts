import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {
  public about: any;
  public innerWidth = window.innerWidth;
  public env = environment;

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}

  constructor(private userservice: UserService, private _sanitizer: DomSanitizer, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    document.title =`About Us`;
    this.getAbout();
  }

  getAbout = () =>{
    this.spinner.show()
    this.userservice.getAbout().subscribe(({error,data})=>{
      this.about = this.getSenitize(data.about);
      this.spinner.hide()
    })
  }

  getSenitize = (html  :any) => {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

}

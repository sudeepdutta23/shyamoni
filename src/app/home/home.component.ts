import { Component, HostListener, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../Interfaces/product';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private userservice: UserService, private spinner: NgxSpinnerService) {}
  public productDetails!: Product[];
  public bannerData: any;
  public env = environment;
  public innerWidth = window.innerWidth;
  public midheader = "";

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerWidth = window.innerWidth;
}

  ngOnInit(): void {
    document.title =`Shyamoni | Online Dry Fish Product`;
    this.innerWidth = window.innerWidth;
    this.getAllProducts();
    this.getActiveBanner();
    this.getHomeHeader();
  }

  getAllProducts = () => {
    this.spinner.show()
    this.userservice.getRandomProduct().subscribe(({ data, error }) => {
      this.productDetails = data?.data;
      this.spinner.hide()
    });
  };

  getActiveBanner = () =>{
    this.spinner.show()
    this.userservice.getBanner().subscribe(({data, error})=>{
      this.bannerData = data
      this.spinner.hide()
    })
  }

  getHomeHeader = () =>{
    this.userservice.getHeader().subscribe((res)=>{
      this.midheader = res.data.mid_header
    })
  }

  slides = [
    { img: '../../assets/img/cms/flo3_s1.jpg' },
    { img: '../../assets/img/cms/flo3_s2.jpg' },
    { img: '../../assets/img/cms/flo3_s1.jpg' },
    { img: '../../assets/img/cms/flo3_s2.jpg' },
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    autoRotate: true,
    autoRotateAfter: 1000,
  };

  slideConfig1 = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    autoRotate: true,
    autoRotateAfter: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}

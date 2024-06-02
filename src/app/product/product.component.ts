import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../Interfaces/product';
import { UserService } from '../services/user.service';
import { NotificationComponent } from '../common/notification/notification.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../services/shared.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  private productId: string = '';
  public productDetails!: Product;

  public sellingPrice: any;
  public costPrice: any;
  public discountPrice: any;
  public longDesc: any;

  public productWeight!:any;

  public comments: any;

  public numberOfItems = 1;

  public stock: Number = 0;

  public singleproductWeight = new FormControl('');

  public ratingArr: any[] = [];
  public starCount = 5;
  public rating: number = 1;

  public addFeedbackForm!: FormGroup;

  public currentTab = "Description";
  public suggestedProducts = [];
  public currentImage = ""
  public currentImageIndex = 0;

  public env = environment;
  public currentLink = 'https://api.whatsapp.com/send?text=I love this product on Shyamoni'+"%0a"+window.location.href;



  constructor(
    private route: ActivatedRoute,
    private userservice: UserService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private notif: NotificationComponent,
    private fb: FormBuilder,
    private sharedservice: SharedService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.productId = data['id'];
      this.getProductById(this.productId);
      this.getFeedback(this.productId);
      this.currentLink = 'https://api.whatsapp.com/send?text='+window.location.href;
      
    });

    $(document).on(
      "click",
      "#product_comments_block_extra ul.comments_advices a",
      function (e) {
        $('*[class^="tab-pane"]').removeClass("active");
        $('*[class^="tab-pane"]').removeClass("in");
        $('*[class^="collapse"]').removeClass("in");
        $("#collapseFive").addClass("in");
        $("div#product_comments_block_tab").addClass("active");
        $("div#product_comments_block_tab").addClass("in");
        $('ul.nav-tabs a[href^="#"]').removeClass("active");
        $('a[href="#product_comments_block_tab"]').addClass("active");
      }
    );

    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    this.addFeedbackForm = this.fb.group({
      comment: [null,[Validators.required,Validators.minLength(10)]]
    })

  }

  ngAfterViewInit(){        
    // $(document).ready(function(){
    //   $(".open-comment-form").click(function () {
    //     $('*[class^="collapse"]').removeClass("in");
    //     $("#collapseFive").addClass("in");
    //     ($("#pos-product-comment-modal") as any).modal("show");
    //   });
    // })
    this.currentLink = 'https://api.whatsapp.com/send?text=I love this product on Shyamoni'+"%0a"+window.location.href;
  }

  getProductById = (productId: string) => {
    this.spinner.show()
    this.userservice.getProductById(productId).subscribe(({ data, error }) => {
      this.suggestedProducts = data?.fetchSuggestedProducts;
      this.productDetails = data?.fetchSingleProduct;
      document.title =`${this.productDetails.productName}`;
      this.productWeight = this.productDetails.product_weight;
      this.sellingPrice = this.productWeight[0]?.specialPrice;
      this.costPrice = this.productWeight[0]?.originalPrice;
      this.discountPrice = this.productWeight[0]?.discountAmount;
      this.singleproductWeight.patchValue(this.productWeight[0].weight)
      this.stock = Number(this.productWeight[0].availableStock)
      this.longDesc = this.getSenitize(this.productDetails.longDesc)
      this.currentImage = this.productDetails.product_image[0].ImagePath
      this.spinner.hide()
    });
  };

  getFeedback = (productId: string) =>{
    this.userservice.getFeedbackByProductId(productId).subscribe(({data,error})=>{
      this.comments = data;
    })
  }

  getSenitize = (html  :any) => {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }


  addItem = () =>{
    if(localStorage.getItem('userToken')){
    if(Number(this.stock) < this.numberOfItems){
      this.notif.showInfo("Product is out of stock")
    }else if((this.numberOfItems+1) * Number(this.singleproductWeight.value)> 2000){
      this.notif.showInfo("Cannot buy more than 2 kg at a time")
    }else{
      this.numberOfItems = this.numberOfItems +1;
    }
  }else{
    this.notif.showInfo("Please login First to continue");
    this.router.navigate(['login']);
  }
  }

  removeItem = () =>{
    if(localStorage.getItem('userToken')){
    if(this.numberOfItems>1){
      this.numberOfItems = this.numberOfItems -1;
    }
  }else{
    this.notif.showInfo("Please login First to continue");
    this.router.navigate(['login']);
  }
  }

  addToCart = () =>{
    let index = this.productWeight.findIndex((val: any)=> val.weight == this.singleproductWeight.value)
    const body = {
      product: this.productId,
      pieces: this.numberOfItems,
      // coupons: 0,
      // discount_price: this.discountPrice,
      // selling_price: this.sellingPrice,
      product_weight: this.productWeight[index].id,
      deliveryCharge: this.productWeight[index].deliveryCharge,
      gst: this.productWeight[index].gst
    }
    !localStorage.getItem('userToken') ?
    (this.notif.showInfo("Please Login to add cart"),this.router.navigate(['login'])) :
    Number(this.stock) < this.numberOfItems ? this.notif.showInfo("Product is out of stock") :
    this.numberOfItems < 1 ? (
      this.notif.showInfo("Please select atleast one","item")
    ):(
      (this.userservice.addToCart(body)
      .subscribe(({error,data})=>{
        if(!error){
          this.notif.showSuccess(data);
          this.sharedservice.addTocartClicked();
          this.sharedservice.updatingMiniCartData();
        }else{
          this.notif.showError("Something went wrong cart not added")
        }
      }))
    )
    this.numberOfItems = 1;
    // this.sharedservice.sendCartClickEvent()
  // }
  }

  openCommentModal = () =>{
    $('#pos-product-comment-modal').addClass('in');
    $('#pos-product-comment-modal').css('display','block');
  }

  closeCommentModal = () =>{
    $('#pos-product-comment-modal').removeClass("in");
    $('#pos-product-comment-modal').css('display','none')
  }

  onClick(rating:number) {
    this.rating= rating;
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return '#fdd835';
    } else {
      return '#555';
    }
  }

  addUserComment = () =>{
    this.spinner.show()
    let body ={
      product_id: this.productId,
      userRating: this.rating,
      comment: this.addFeedbackForm.get('comment')?.value
    }
    this.addFeedbackForm.get('comment')?.value === ''? (
      this.notif.showInfo('Empty comments cannot be','saved!!'),
      this.spinner.hide()
    ) :(
    this.userservice.addUserFeedBack(body).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess(data);
        this.closeCommentModal()
        this.spinner.hide()
      }else{
        this.notif.showError(data)
        this.spinner.hide()
      }
      this.getFeedback(this.productId);
      this.addFeedbackForm.reset()
    }))
  }

  navigateToElem = () =>{
    document.getElementById("tabs")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    })
  }

  changedWeight = (event: any) => {  
    this.singleproductWeight.patchValue(event);
    const price = this.productWeight.filter((val: any)=>val.weight == event)
    this.sellingPrice = price[0].specialPrice
    this.costPrice = price[0].originalPrice
    this.discountPrice = price[0].discountAmount
    this.stock = Number(price[0].availableStock)
    this.numberOfItems = 1;
  }

  previousImage = () =>{
    if(this.currentImageIndex !== 0){
      this.currentImageIndex -= 1;
      this.currentImage = this.productDetails?.product_image[this.currentImageIndex]?.ImagePath
    }
  }

  nextImage = () =>{
    if(this.currentImageIndex < this.productDetails?.product_image?.length -1){
      this.currentImageIndex += 1;
      this.currentImage = this.productDetails?.product_image[this.currentImageIndex]?.ImagePath
    }
  }

  clickedImage = (image: string, index: number) =>{
    this.currentImageIndex = index;
    this.currentImage = image;
  }

  slideConfig = {
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

  setDefault = (e: any) =>{
    e.target.src = this.env.defaultImage
  }

  copyToClipBoard = () =>{
    navigator.clipboard.writeText('I love this product on Shyamoni '+ window.location.href)
  }

}

import { animate, state, style, transition, trigger } from '@angular/animations';
import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

// export interface Tags {
//   name: string;
// }

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  // animations: [
  //   trigger('detailExpand', [
  //     state('collapsed', style({ height: '0px', minHeight: '0' })),
  //     state('expanded', style({ height: '*' })),
  //     transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  //   ]),
  // ],
})


export class ProductComponent implements OnInit {
  pageYoffset!: number;
//   @HostListener('window:scroll', ['$event']) onScroll(){
//     this.pageYoffset = window.pageYOffset;
//  }
  public addProductForm!: FormGroup;
  public updateProductForm!: FormGroup;
  public categories: any;
  public products: any;
  public allSubCategories: any;
  public mappedSubCategories: any;
  public files: File[] = [];
  public Ufiles: File[] = [];
  public displayedColumns: string[] = ['productName','brand','status','Delete/update'];
  public dataSource = new MatTableDataSource<any>();
  public editImagesArray: any = [];
  public editButton: boolean = false; 
  isTableExpanded = false;
  public updatedWeight:any;
  updatableImages: any;
  public productWeights: any;
  public includedWeights = [];
  selectable = true;
  removable = true;
  public gstPercent = 0;

  public productDetailsData = [];
  public isEditEnabled = false;

  public currentUrl!: string;

  constructor(private adminservice: AdminService, 
              private fb: FormBuilder,
              private notif: NotificationComponent,
              private scroll: ViewportScroller,
              private router: Router
    ) {
    this.getCategory();
    this.getProducts();
  }
  
  ngOnInit(): void {
    this.adminservice.getGstValue().subscribe(({data, error})=>{
      if(!error){
        this.gstPercent = data?.gst;
      }
    })

    this.addProductForm = this.fb.group({
      Category: [null, Validators.required],
      subCategory: [null, Validators.required],
      productName: [null, Validators.required],
      brand: [null, Validators.required],
      shortDesc: [null, [Validators.required, Validators.maxLength(2000)]],
      longDesc: [null, Validators.required],
      product_weight: this.fb.array([]),
      keywords: [null],
      // tag_name: [null, Validators.required]
    })

    
    this.updateProductForm = this.fb.group({
      UCategory: [null, Validators.required],
      UsubCategory: [null, Validators.required],
      UProductId: [null],
      UproductName: [null, Validators.required],
      Ubrand: [null, Validators.required],
      UshortDesc: [null, Validators.required],
      UlongDesc: [null, Validators.required],
      Uproduct_weight: this.fb.array([]),
      Ukeywords: [null, Validators.required],
    });
    this.fetchAllWeight()
    
    this.product_weight().push(this.newproduct_weight())
    let weightForm = this.addProductForm.get('product_weight') as FormArray
  }
  
  fetchAllWeight = () =>{
    this.adminservice.fetchAllWeight().subscribe(({data,error})=>{
      this.productWeights = data
    })
  }

  //Dynamic weight add
  product_weight(): FormArray{
    return this.addProductForm?.get("product_weight") as FormArray
  }
  
  newproduct_weight(): FormGroup{
    return this.fb.group({
      weight: [null, Validators.required],
      originalPrice: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      specialPrice: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      discountAmount: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      quantity: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      deliveryCharge: [null,[Validators.required]],
      gst: [this.gstPercent,[Validators.required]]
    })
  }

  addProductWeight = (update: any) =>{
    if(update === "add"){
      this.product_weight().push(this.newproduct_weight())
    }else if(update === "update"){
      this.update_product_weight().push(this.newproduct_weight())
    }
  }


  removeProductWeight = (i: number) =>{
    this.product_weight().removeAt(i)
  }


  //Dynamic weight add
  update_product_weight(): FormArray{
    return this.updateProductForm?.get("Uproduct_weight") as FormArray
  }
  
  update_newproduct_weight(id: any, weight: String, op: String, sp: String, dp: String, quantity: String): FormGroup{
    return this.fb.group({
      id: [id],
      weight: [id? {value: weight, disabled: true} : weight, Validators.required],
      originalPrice: [op, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      specialPrice: [sp, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      discountAmount: [dp, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      quantity: [quantity, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  }

  UpdateProductWeight = (id: any, weight: String, op: String, sp: String, dp: String, quantiy: String) =>{
    this.update_product_weight().push(this.update_newproduct_weight(id,weight,op,sp,dp,quantiy))
  }


  getCategory = () => {
    this.adminservice.getCategories().subscribe(({ error, data })=>{
      this.categories = data;
    })
  }

  mapSubcategories = (event: any, cb : any = null) =>{
   this.adminservice.getSubCategoriesByCategoryId(event.value).subscribe(({ error, data })=>{
     this.mappedSubCategories = data;
     if (cb) cb();
   })
  }

  addProduct = () =>{
    const formData:any = new FormData();
    formData.append('Category',this.addProductForm.get('Category')?.value)
    formData.append('subCategory',this.addProductForm.get('subCategory')?.value)
    formData.append('productName',this.addProductForm.get('productName')?.value)
    formData.append('brand',this.addProductForm.get('brand')?.value)
    // formData.append('quantity',this.addProductForm.get('quantity')?.value)
    // formData.append('orginal_price',this.addProductForm.get('orginal_price')?.value)
    // formData.append('selling_price',this.addProductForm.get('selling_price')?.value)
    // formData.append('discount_amount',this.addProductForm.get('discount_amount')?.value)
    formData.append('shortDesc',this.addProductForm.get('shortDesc')?.value)
    formData.append('longDesc',this.addProductForm.get('longDesc')?.value)
    formData.append('keywords',this.addProductForm.get('keywords')?.value)
    formData.append("product_weight[]",JSON.stringify(this.addProductForm.get('product_weight')?.value))
    formData.append("tag_name",this.tags.toString())
    this.files.forEach((val:File,i)=>{
      formData.append("ImagePath[]",this.files[i])
    })
    
    if(this.addProductForm.valid && this.files) {
      this.adminservice.addProduct(formData).subscribe(({ error, data })=>{
        if(!error){
          this.notif.showSuccess(data)
          this.getProducts();
          this.addProductForm.reset()
          this.files = []
          this.tags = []
        }
      })
  }
}

  getProducts = () =>{
    this.adminservice.getProduct().subscribe(({ error, data })=>{
      let result = data.searchItems.data
      this.dataSource = new MatTableDataSource<any>(result);
      this.products = data
    })
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSelect = (event: any) => {
    if(this.files?.length + this.editImagesArray?.length >4){
      this.notif.showError("you can only add 5 files")
    }else{
      this.files = event.addedFiles;
    }
  }

  onRemove = (event: any) => {
    this.files.splice(this.files.indexOf(event), 1);
  }

  UonSelect = (event: any) => {
    if(this.Ufiles?.length + this.updatableImages?.length >4){
      this.notif.showError("you can only add 5 files")
    }else{
      this.Ufiles = event.addedFiles;
    }
  }

  UonRemove = (event: any) => {
    this.Ufiles.splice(this.Ufiles.indexOf(event), 1);
  }

  paginateCommon = (url: any) =>{
    this.adminservice.paginateProductByUrl(url).subscribe(({error, data})=>{
      this.products = data;
      this.dataSource = new MatTableDataSource<any>(data?.searchItems?.data);
    })
  }

  previousPage = (url: any) => this.paginateCommon(url)

  nextPage = (url: any) =>{ 
    this.paginateCommon(url);
    this.currentUrl = url;
  }

  onPageNumberSelect = (url: any) =>{ 
    this.paginateCommon(url);
    this.currentUrl = url;
  }

  deleteProduct = (id: any) =>{
    let confirmDelete = confirm("Are You sure you want to delete this product!")
    if(confirmDelete){
      this.adminservice.deleteProduct(id).subscribe(({error,data})=>{
        this.notif.showSuccess(data)
        this.getProducts();
    })
      
    }else{
      this.notif.showInfo("Cancelled Product Deletion")
    }
  }


  deleteProductImage = (id: any) =>{
    let confirm = window.confirm("Are You sure you want to delete image")
    if(confirm){
      this.adminservice.deleteProductImage(id).subscribe(({error, data})=>{
        if(!error){
          this.notif.showSuccess(data);
          this.getProducts();
        }
      })
    }
    this.removeUpdateWeightControls(true)
  }

  getImagesByProductId = (id: any) =>{
    this.adminservice.getProductImagesByProductId(id).subscribe(({error,data})=>{
      this.editImagesArray = data; 
    })
  }

  resetForm = () =>{
    this.addProductForm.reset();
    this.editImagesArray = [];
  }

  setSellingPrice = (event: any) =>{
      if(event.target.getAttribute('formControlName') == 'orginal_price'){
        this.addProductForm.get('selling_price')?.setValue(Number(event.target.value) - Number(this.addProductForm.get('discount_amount')?.value))
      }
      if(event.target.getAttribute('formControlName') == 'discount_amount'){
        this.addProductForm.get('selling_price')?.setValue(Number(this.addProductForm.get('orginal_price')?.value) - Number(event.target.value))
      }
      if(this.addProductForm.get('selling_price')?.value < 0){
        this.addProductForm.get('selling_price')?.setValue(0)
      }    
  }

  editClick = (element: any) =>{
    // this.router.navigate(['/admin/dashboard/productChild', {productDetails: JSON.stringify(element)}])
    this.productDetailsData = element;
    this.isEditEnabled = true;
    if(element.product_weight.length>0){
      element.product_weight.forEach((val: any)=>{
        this.update_product_weight().push(this.update_newproduct_weight(val.id,val.weight,val.originalPrice,val.specialPrice,val.discountAmount,val.quantity))
      })
    }
    // this.updateProductForm.get('UCategory')?.setValue(element?.cate_id)
    // this.updateProductForm.get('UsubCategory')?.setValue(element?.subCate_id)
    // this.updateProductForm.get('UProductId')?.setValue(element?.id)
    // this.updateProductForm.get('UproductName')?.setValue(element?.productName)
    // this.updateProductForm.get('Ubrand')?.setValue(element?.brand)
    // this.updateProductForm.get('Uquantity')?.setValue(element?.quantity)
    // this.updateProductForm.get('Uorginal_price')?.setValue(element?.orginal_price)
    // this.updateProductForm.get('Uselling_price')?.setValue(element?.selling_price)
    // this.updateProductForm.get('Udiscount_amount')?.setValue(element?.discount_amount)
    // this.updateProductForm.get('UshortDesc')?.setValue(element?.shortDesc)
    // this.updateProductForm.get('UlongDesc')?.setValue(element?.longDesc)
    // this.updateProductForm.get('Ukeywords')?.setValue(element?.keywords)
    // this.updatableImages = element.product_image;
  }

  updateProduct = () =>{
    const formData:any = new FormData();
    formData.append('Category',this.updateProductForm.get('UCategory')?.value)
    formData.append('subCategory',this.updateProductForm.get('UsubCategory')?.value)
    formData.append('productName',this.updateProductForm.get('UproductName')?.value)
    formData.append('brand',this.updateProductForm.get('Ubrand')?.value)
    // formData.append('quantity',this.updateProductForm.get('Uquantity')?.value)
    // formData.append('orginal_price',this.updateProductForm.get('Uorginal_price')?.value)
    // formData.append('selling_price',this.updateProductForm.get('Uselling_price')?.value)
    // formData.append('discount_amount',this.updateProductForm.get('Udiscount_amount')?.value)
    formData.append('shortDesc',this.updateProductForm.get('UshortDesc')?.value)
    formData.append('longDesc',this.updateProductForm.get('UlongDesc')?.value)
    formData.append('product_weight',this.addProductForm.get('Uproduct_weight')?.value)
    formData.append('keywords',this.updateProductForm.get('Ukeywords')?.value)
    this.Ufiles.forEach((val:File,i)=>{
      formData.append("ImagePath[]",this.Ufiles[i])
    })
    
    // if(this.updateProductForm.valid) {
      this.adminservice.updateProduct(formData, this.updateProductForm.get('UProductId')?.value).subscribe(({ error, data })=>{
        if(!error){
          this.notif.showSuccess(data)
          this.getProducts();
          this.updateProductForm.reset()
          this.removeUpdateWeightControls(true)
          this.Ufiles = []
        }
      })
  // }
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: any[] = [];
  updateTags: any[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    
    // Add our tag
    if(this.tags.length === 10){
      this.notif.showInfo('Cannot add more than 5 tags!!')
    }else{
    if (value) {
      this.tags.push(value);
    }
  }
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: any): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  removetagUpdate(tag: any):void{
    const indexOfObject = this.updateTags.findIndex(object => {
      return object.id == tag.id;
    });

    if (indexOfObject >= 0) {
      this.adminservice.deleteTags(tag.id).subscribe(({data,error})=>{
        if(!error){
          this.updateTags.splice(indexOfObject, 1);
          this.notif.showSuccess(data)
        }
      })
    }
  }

  updateAdd(event: MatChipInputEvent, product_id:any): void {
    const value = (event.value || '').trim();    
    // Add our tag
    if(value !== ""){
    if(this.updateTags.length >= 5){
      this.notif.showInfo('Cannot add more than 5 tags!!')
    }else{
    if (value) {
      let tag = {
        id:"",
        product_id,
        tag_name: value
      }
      this.adminservice.addIndividualTag(tag).subscribe(({data:{ allProductTag }, error})=>{
        if(!error){
          this.updateTags.push(tag);
          this.updateTags = allProductTag;
        }
      })
    }
  }
    // Clear the input value
    event.chipInput!.clear();
}
  }

  deleteWeight = (id: any, index: any) =>{
    !id? this.update_product_weight().removeAt(index):
    this.adminservice.deleteProductWeight(id).subscribe(({error, data})=>{
      if(!error){
        this.notif.showSuccess(data)
      }
    })
    this.removeUpdateWeightControls(true)
    this.getProducts()
  }

  removeUpdateWeightControls = (allowPop: Boolean) =>{
    if(this.updateProductForm.get('Uproduct_weight')?.value.length > 0 && allowPop){
      while(this.updateProductForm.get('Uproduct_weight')?.value.length !== 0) {
       this.update_product_weight().removeAt(this.updateProductForm.get('Uproduct_weight')?.value.length-1)
     }
    }
  }
  
  updateProductWeight = (id: any) =>{
    let body = {
      product_weight: this.updateProductForm.getRawValue()?.Uproduct_weight
    }   
    this.adminservice.editProductWeight(id,JSON.stringify(body)).subscribe(({data,error})=>{
      this.notif.showSuccess(data);
    })
    this.removeUpdateWeightControls(true)
    this.getProducts()
  }

  updateProdStatus = (productId:any, status: any) =>{
    status = !status
    this.adminservice.updateProductStatus(productId,status?1:0).subscribe(({data, error})=>{
      this.notif.showSuccess(data)
      this.getProducts();
    })
  }

  setLongDesc = (event: any) =>{
    this.addProductForm.get('longDesc')?.setValue(event)
  }
  setUpdateLongDesc = (event: any) =>{
    this.updateProductForm.get('UlongDesc')?.setValue(event)
  }

  selectWeight = (e: any, i: number) => this.product_weight().controls[i].setValue({weight: e.value, originalPrice: null, specialPrice: null, discountAmount: null, quantity: null, deliveryCharge: this.productWeights[this.productWeights.findIndex((val: any)=> val.weight == e.value)].deliveryCharge, gst: this.gstPercent}) 

  showProductParent = (event: any) =>{
    this.isEditEnabled = false;
  } 

  updateProductForChild = (event: any) =>{
    this.isEditEnabled = false;
    this.getProducts()
    // this.adminservice.getProduct().subscribe(({ error, data })=>{
    //   if(!error){
    //     this.productDetailsData = data?.searchItems?.data.filter((val)=> val.id == event)[0]        
    //   }
    // })
  }

}
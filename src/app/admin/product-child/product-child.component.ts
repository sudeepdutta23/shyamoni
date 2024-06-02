import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-child',
  templateUrl: './product-child.component.html',
  styleUrls: ['./product-child.component.css'],
})
export class ProductChildComponent implements OnInit {
  @Input() productDetailsFromParent: any;

  @Input() currentUrl!:string;

  @Output() goBack = new EventEmitter<string>();

  @Output() updateProductDetails = new EventEmitter<string>();

  public productDetails: any;
  public updateProductForm!: FormGroup;
  public productWeights: any;
  updateTags: any[] = [];
  public Ufiles: File[] = [];
  addOnBlur = true;
  selectable = true;
  removable = true;
  updatableImages: any;
  public categories: any;
  public mappedSubCategories: any;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private adminservice: AdminService,
    private notif: NotificationComponent,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.fetchAllWeight();
    this.productDetails = this.productDetailsFromParent;
    this.populateData(this.productDetails, false)
    console.log("current url", this.currentUrl);
    
  }

  fetchAllWeight = () => {
    this.adminservice.fetchAllWeight().subscribe(({ data, error }) => {
      this.productWeights = data;
    });
  };

  //Dynamic weight add
  update_product_weight(): FormArray {
    return this.updateProductForm?.get('Uproduct_weight') as FormArray;
  }

  update_newproduct_weight(
    id: any,
    weight: String,
    op: String,
    sp: String,
    dp: String,
    quantity: String
  ): FormGroup {
    return this.fb.group({
      id: [id],
      weight: [
        id ? { value: weight, disabled: true } : weight,
        Validators.required,
      ],
      originalPrice: [
        op,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      specialPrice: [
        sp,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      discountAmount: [
        dp,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      quantity: [
        quantity,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
    });
  }

  UpdateProductWeight = (
    id: any,
    weight: String,
    op: String,
    sp: String,
    dp: String,
    quantiy: String
  ) => {
    this.update_product_weight().push(
      this.update_newproduct_weight(id, weight, op, sp, dp, quantiy)
    );
  };

  removetagUpdate(tag: any): void {
    const indexOfObject = this.updateTags.findIndex((object) => {
      return object.id == tag.id;
    });

    if (indexOfObject >= 0) {
      this.adminservice.deleteTags(tag.id).subscribe(({ data, error }) => {
        if (!error) {
          this.updateTags.splice(indexOfObject, 1);
          this.notif.showSuccess(data);
        }
      });
    }
  }

  updateAdd(event: MatChipInputEvent, product_id: any): void {
    const value = (event.value || '').trim();
    // Add our tag
    if (value !== '') {
      if (this.updateTags.length >= 5) {
        this.notif.showInfo('Cannot add more tags!!');
      } else {
        if (value) {
          let tag = {
            id: '',
            product_id,
            tag_name: value,
          };
          this.adminservice
            .addIndividualTag(tag)
            .subscribe(({ data: { allProductTag }, error }) => {
              if (!error) {
                this.updateTags.push(tag);
                this.updateTags = allProductTag;
              }
            });
        }
      }
      // Clear the input value
      event.chipInput!.clear();
    }
  }

  setUpdateLongDesc = (event: any) => {
    this.updateProductForm.get('UlongDesc')?.setValue(event);
  };

  addProductWeight = (update: any) => {
    this.update_product_weight().push(this.newproduct_weight());
  };

  newproduct_weight(): FormGroup {
    return this.fb.group({
      weight: [null, Validators.required],
      originalPrice: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      specialPrice: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      discountAmount: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      quantity: [
        null,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      deliveryCharge: [null, [Validators.required]],
      gst: [6, [Validators.required]],
    });
  }

  UonSelect = (event: any) => {
    if (this.Ufiles?.length + this.updatableImages?.length > 4) {
      this.notif.showError('you can only add 5 files');
    } else {
      this.Ufiles = event.addedFiles;
    }
  };

  UonRemove = (event: any) => {
    this.Ufiles.splice(this.Ufiles.indexOf(event), 1);
  };

  updateProduct = () => {
    const formData: any = new FormData();
    formData.append('Category', this.updateProductForm.get('UCategory')?.value);
    formData.append(
      'subCategory',
      this.updateProductForm.get('UsubCategory')?.value
    );
    formData.append(
      'productName',
      this.updateProductForm.get('UproductName')?.value
    );
    formData.append('brand', this.updateProductForm.get('Ubrand')?.value);
    formData.append(
      'shortDesc',
      this.updateProductForm.get('UshortDesc')?.value
    );
    formData.append('longDesc', this.updateProductForm.get('UlongDesc')?.value);
    formData.append(
      'product_weight',
      this.updateProductForm.get('Uproduct_weight')?.value
    );
    formData.append('keywords', this.updateProductForm.get('Ukeywords')?.value);
    this.Ufiles.forEach((val: File, i) => {
      formData.append('ImagePath[]', this.Ufiles[i]);
    });

    // if(this.updateProductForm.valid) {
    this.adminservice
      .updateProduct(formData, this.updateProductForm.get('UProductId')?.value)
      .subscribe(({ error, data }) => {
        if (!error) {
          this.notif.showSuccess(data);
          this.getProducts();
          // this.updateProductForm.reset();
          // this.backClicked();
          // this.updateProductDetails.emit(this.productDetails?.id)
          // this.removeUpdateWeightControls(true);
          this.Ufiles = [];
        }
      });
    // }
  };

  removeUpdateWeightControls = (allowPop: Boolean) => {
    this.backClicked();
    if (
      this.updateProductForm.get('Uproduct_weight')?.value.length > 0 &&
      allowPop
    ) {
      while (
        this.updateProductForm.get('Uproduct_weight')?.value.length !== 0
      ) {
        this.update_product_weight().removeAt(
          this.updateProductForm.get('Uproduct_weight')?.value.length - 1
        );
      }
    }
  };

  updateProductWeight = (id: any) => {
    let body = {
      product_weight: this.updateProductForm.getRawValue()?.Uproduct_weight,
    };
    this.adminservice
      .editProductWeight(id, JSON.stringify(body))
      .subscribe(({ data, error }) => {
        this.notif.showSuccess(data);
        // this.updateProductDetails.emit(this.productDetails?.id);
        this.getProducts()
      });
    // this.removeUpdateWeightControls(true);
  };

  deleteProductImage = (id: any) => {
    let confirm = window.confirm('Are You sure you want to delete image');
    if (confirm) {
      this.adminservice.deleteProductImage(id).subscribe(({ error, data }) => {
        if (!error) {
          this.notif.showSuccess(data);
          let deleteIndex = this.updatableImages.findIndex(
            (val) => val.id == id
          );
          this.updatableImages.splice(deleteIndex, 1);
          // this.getProducts();
        }
      });
    }
    // this.removeUpdateWeightControls(true);
  };

  deleteWeight = (id: any, index: any) => {
    !id
      ? this.update_product_weight().removeAt(index)
      : this.adminservice
          .deleteProductWeight(id)
          .subscribe(({ error, data }) => {
            if (!error) {
              this.notif.showSuccess(data);
              if (!data.includes('Must keep atleast one product Weight')) {
                let deleteIndex =
                  this.update_product_weight()?.value?.findIndex(
                    (val) => val?.id === id
                  );
                this.update_product_weight().removeAt(deleteIndex);
                // this.updateProductDetails.emit(this.productDetails?.id);
                this.getProducts();
              }
            }
          });

    // this.removeUpdateWeightControls(true);
    // this.getProducts()
  };

  getCategory = () => {
    this.adminservice.getCategories().subscribe(({ error, data }) => {
      this.categories = data;
    });
  };

  mapSubcategories = (catId: any) => {
    this.adminservice
      .getSubCategoriesByCategoryId(catId)
      .subscribe(({ error, data }) => {
        this.mappedSubCategories = data;
      });
  };

  categoryChange = (event: any, cb: any = null) => {
    this.adminservice
      .getSubCategoriesByCategoryId(event.value)
      .subscribe(({ error, data }) => {
        this.mappedSubCategories = data;
        if (cb) cb();
      });
  };

  backClicked = () => {
    // this._location.back();
    // this.goBack.emit(this.productDetails?.id);
    this.goBack.emit(this.productDetails?.id);
  };

  getProducts = () => {
    if(this.currentUrl){
      this.adminservice.paginateProductByUrl(this.currentUrl).subscribe(({ error, data }) => {
        let result = data.searchItems.data;
        console.log(result.filter((val)=>val?.id == this.productDetails?.id)[0]);
        this.populateData(result.filter((val)=>val?.id == this.productDetails?.id)[0])
      });
    }else{
      this.adminservice.getProduct().subscribe(({ error, data }) => {
        let result = data.searchItems.data;
        console.log(result.filter((val)=>val?.id == this.productDetails?.id)[0]);
        this.populateData(result.filter((val)=>val?.id == this.productDetails?.id)[0])
      });
    }
  };

  populateData = (productData: any, reset = true) => {
    if(reset) this.updateProductForm.reset();
    this.productDetails = productData;
    this.adminservice
      .getTagByProdId(productData?.id)
      .subscribe(({ data }) => {
        this.updateTags = data;
      });
    this.updateProductForm = this.fb.group({
      UCategory: [productData.cate_id, Validators.required],
      UsubCategory: [productData.subCate_id, Validators.required],
      UProductId: [productData.id],
      UproductName: [productData.productName, Validators.required],
      Ubrand: [productData.brand, Validators.required],
      UshortDesc: [productData.shortDesc, Validators.required],
      UlongDesc: [productData.longDesc, Validators.required],
      Uproduct_weight: this.fb.array([]),
      Ukeywords: [productData.keywords, Validators.required],
    });
    if (productData?.cate_id) {
      this.mapSubcategories(productData?.cate_id);
    }
    this.updatableImages = productData.product_image;
    if (productData.product_weight.length > 0) {
      productData.product_weight.forEach((val: any) => {
        this.update_product_weight().push(
          this.update_newproduct_weight(
            val.id,
            val.weight,
            val.originalPrice,
            val.specialPrice,
            val.discountAmount,
            val.quantity
          )
        );
      });
    }
  };
}

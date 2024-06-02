import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from '../Interfaces/product';
import { SharedService } from '../services/shared.service';
import { UserService } from '../services/user.service';
import { Options, LabelType } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@angular/forms';
import FilterProduct from '../Interfaces/FilterProduct';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ourproducts',
  templateUrl: './ourproducts.component.html',
  styleUrls: ['./ourproducts.component.css'],
})
export class OurproductsComponent implements OnInit {
  public products: any;
  public currentPage: any = 1;
  public totalPage: any = 10;
  public termsFromParams: string = '';

  public env = environment;

  minValue: number = 0;
  maxValue: number = 100000;
  brands: any;
  showFilterForSmallScreen: Boolean = false;

  @Input() homeview: any;

  public searchObject = {
    terms: '',
    brand: Array(),
    minPrice: this.minValue,
    maxPrice: this.maxValue,
  };

  options: Options = {
    floor: 0,
    ceil: 100,
    // minRange: this.minValue,
    // maxRange: this.maxValue,
    // minLimit: this.minValue,
    // maxLimit: this.maxValue,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return 'र.' + value.toString();
          return '';
        case LabelType.High:
          return 'र.' + value.toString();
          return '';
        default:
          return 'र.' + value;
      }
    },
  };

  setNewCeil(newCeil: number, newFloor: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.ceil = newCeil;
    newOptions.floor = newFloor;
    this.options = newOptions;
  }

  setNewFloor(newFloor: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options);
    newOptions.floor = newFloor;
    this.options = newOptions;
  }

  constructor(
    private userservice: UserService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe((val) => {
      if (!val['term']) {
        this.fetchProduct();
      }
    });
  }

  ngOnInit(): void {    
    if(document.title != "Shyamoni | Online Dry Fish Product" || window.location.href.includes("ourproducts")){
      document.title =`Our Products`;
    }
    this.route.params.subscribe((params) => {
      this.termsFromParams = params['term'];
      this.searchObject.terms = this.termsFromParams;
      if (this.termsFromParams != undefined) {
        this.filterProductParams(this.searchObject);
      }
    });
    if (this.termsFromParams == undefined) {
      this.fetchProduct();
    }
  }


  fetchProduct = () => {
    this.spinner.show();
    this.userservice.getProducts(false, {}).subscribe(({ error, data }) => {
      this.products = data.searchItems;
      this.minValue = data.filters.min;
      this.maxValue = data.filters.max;
      this.searchObject.minPrice = data.filters.min;
      this.searchObject.maxPrice = data.filters.max;
      this.brands = data.filters.brand;
      this.setNewCeil(data.filters.max, data.filters.min);
      // this.setNewFloor(data.filters.min);
      this.spinner.hide();
    });
  };

  filterProductParams = (data: any) => {
    this.userservice.getProducts(true, data).subscribe(({ error, data }) => {
      this.products = data.searchItems;
      this.minValue = data.filters.min;
      this.maxValue = data.filters.max;
      this.searchObject.minPrice = data.filters.min;
      this.searchObject.maxPrice = data.filters.max;
      this.brands = data.filters.brand;
      this.setNewCeil(data.filters.max, data.filters.min);
      // this.setNewFloor(data.filters.min);
    });
  };

  filterProduct = (data: any) => {
    this.userservice.getProducts(true, data).subscribe(({ error, data }) => {
      this.products = data.searchItems;
    });
  };

  changeValue = (e: any) => {
    this.minValue = e.value;
    this.maxValue = e.highValue;
    this.searchObject.minPrice = this.minValue;
    this.searchObject.maxPrice = this.maxValue;
    this.filterProduct(this.searchObject);
  };

  paginateCommon = (url: any) => {
    this.spinner.show();
    this.userservice
      .getProducts(false, {}, url)
      .subscribe(({ error, data }) => {
        this.products = data.searchItems;
        this.spinner.hide();
      });
    // this.userservice.paginateProductByUrl(url).subscribe(({ error, data }) => {
    //   this.products = data.searchItems;
    //   this.spinner.hide();
    // });
  };

  checkBrand = (brand: any) => {
    if (this.searchObject.brand.includes(brand)) {
      this.searchObject.brand.splice(brand, 1);
    } else {
      this.searchObject.brand.push(brand);
    }
    this.filterProduct(this.searchObject);
  };
}

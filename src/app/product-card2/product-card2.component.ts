import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Product } from '../Interfaces/product';

@Component({
  selector: 'app-product-card2',
  templateUrl: './product-card2.component.html',
  styleUrls: ['./product-card2.component.css']
})
export class ProductCard2Component implements OnInit {
  public env = environment;
@Input() product!: any;
  constructor(private router: Router) { }

  ngOnInit(): void {}

  navigateToProduct = (id: string) =>this.router.navigate([`product/${id}`])

  setDefault = (e: any) =>{
    e.target.src = this.env.defaultImage;
  }

}

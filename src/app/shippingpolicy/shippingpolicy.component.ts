import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shippingpolicy',
  templateUrl: './shippingpolicy.component.html',
  styleUrls: ['./shippingpolicy.component.css']
})
export class ShippingpolicyComponent implements OnInit {
  public env = environment;
  constructor() { }

  ngOnInit(): void {
    document.title =`Shipping & Delivery Policy`;
  }

}

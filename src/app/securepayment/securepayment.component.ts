import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-securepayment',
  templateUrl: './securepayment.component.html',
  styleUrls: ['./securepayment.component.css']
})
export class SecurepaymentComponent implements OnInit {
  public env = environment;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-returnpolicy',
  templateUrl: './returnpolicy.component.html',
  styleUrls: ['./returnpolicy.component.css']
})
export class ReturnpolicyComponent implements OnInit {
  public env = environment;

  constructor() { }

  ngOnInit(): void {
    document.title =`Return/Refund Policy`;
  }

}

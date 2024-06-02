import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cancelpolicy',
  templateUrl: './cancelpolicy.component.html',
  styleUrls: ['./cancelpolicy.component.css']
})
export class CancelpolicyComponent implements OnInit {
  public env = environment;

  constructor() { }

  ngOnInit(): void {
    document.title =`Cancellation Policy`;
  }

}

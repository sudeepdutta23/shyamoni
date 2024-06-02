import { Component, OnInit, Output, EventEmitter } from '@angular/core';

declare var Instamojo: any;

@Component({
  selector: 'app-instamojo',
  templateUrl: './instamojo.component.html',
  styleUrls: ['./instamojo.component.css']
})
export class InstamojoComponent implements OnInit {


  @Output() paymentClose = new EventEmitter<any>();

  @Output() paymentSuccess = new EventEmitter<any>();

  paymentModalClose = (response) => this.paymentClose.emit();

  paymentCapture = (res: any) =>this.paymentSuccess.emit(res);

  payOnline = () =>{
    Instamojo.configure({
      handlers: {
        // onOpen: function() {},
        onClose:  ()=>this.paymentModalClose(""),
        onSuccess: (response)=>{ console.log("Sudeep",response);this.paymentCapture.bind(response)},
        onFailure: (response)=>this.paymentModalClose(response)
      }
    })

    Instamojo.open('https://test.instamojo.com/@lfree4857/5723165758454cbebc341d40005852c8')

  }
  constructor() { }

  ngOnInit(): void {
  }

}

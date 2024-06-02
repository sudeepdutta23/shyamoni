import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { SpitAroundCommaService } from '../services/spit-around-comma.service'
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit,AfterViewInit {
  @ViewChild('invoice')
  invoice!: ElementRef;
  public divEl: any;
  public shyamoni_order_id: any;
  public orderDetails: any;
  public priceDetails: any;
  public address: any;
  public totalPrice = 0;
  public totalDiscount = 0;
  public env = environment;

  constructor(
      private activatedRoute: ActivatedRoute,
      private userservice: UserService,
      public spacearoundcomma: SpitAroundCommaService
  ) { }

  ngOnInit(): void {
    this.shyamoni_order_id = this.activatedRoute.snapshot.paramMap.get('id')
    this.getInvoice()
  }

  getInvoice = () =>{
    // this.userservice.getInvoiceById(this.shyamoni_order_id).subscribe(({data: { fetchOrderDetails, getPriceDetails, getUserAddress } , error})=>{
    //   this.orderDetails = fetchOrderDetails;
    //   this.priceDetails = getPriceDetails;
    //   this.address = getUserAddress;
    //   this.priceDetails.forEach((val: any)=>{
    //     this.totalPrice += val.totalPrice
    //   })
    // })
  }

  ngAfterViewInit(): void {
    this.divEl = this.invoice.nativeElement;
  }

  public convertToPDF()
{
  html2canvas(this.divEl).then(canvas => {
    // Few necessary setting options
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth() -20;
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 10, 0, width, height)
    pdf.save('shyamoni_bill.pdf'); // Generated PDF
    });
    }

}

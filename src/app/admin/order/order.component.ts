import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
import { FormControl } from '@angular/forms';
import { SpitAroundCommaService } from 'src/app/services/spit-around-comma.service';

export interface PeriodicElement {
  order_id: string;
  totalPrice: string;
  paymentStatus: string;
  orderDate: string;
  awb_id: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public displayedColumns: string[] = ['order_id','name','address_id','totalPrice','paymentStatus','orderDate','awb_id','insert_awb'];
  public dataSource = new MatTableDataSource<any>();
  public editAWBID: any = null;
  public tempAwb: any = null;
  awbId = new FormControl('');
  
  constructor(private adminservice: AdminService, private notif: NotificationComponent, public splitaroundcomma: SpitAroundCommaService) { }

  ngOnInit(): void {
    this.fetchAllOrders()
  }

  fetchAllOrders = () =>{
    this.adminservice.fetchAllOrders().subscribe(({data: { getAllOrders }, error})=>{
      this.dataSource = new MatTableDataSource<any>(getAllOrders);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insertAwb = (index: any, awb: any) =>{
    this.editAWBID = index;
    this.awbId.setValue(awb)
  }

  addAwbId = (element: any) =>{
    let data = {
      awb_id: this.awbId.value,
      orderID: element.order_id,
      user_id: element.user_id
    }
    this.editAWBID = null
    this.adminservice.updateAWB(data).subscribe(({data,error})=>{
      if(!error){
        this.notif.showSuccess(data);
        this.fetchAllOrders();
      }
    })
    this.awbId.setValue('')
  }
}

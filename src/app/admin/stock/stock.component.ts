import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';

export interface PeriodicElement {
  id: string
  productName: string;
  totalStockIn: string;
  totalStockOut: string;
}

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  stockForm!: FormGroup
  myControl = new FormControl();
  updateStockIn = new FormControl("")
  updateStockOut = new FormControl("")
  stockOption = ["Stock-out","Stock-in"]
  public displayedColumns: string[] = ['productName','weight','totalStockIn', 'totalStockOut'];
  public dataSource = new MatTableDataSource<any>();
  public products: any;
  weightsOfProduct: any
  constructor(private adminservice: AdminService,
              private fb: FormBuilder,
              private notif: NotificationComponent
    ) { }

  ngOnInit(): void {
    this.fetchProducts()
    this.fetchProductStock()
    this.stockForm = this.fb.group({
      product: ['',[Validators.required]],
      product_weight: ['',[Validators.required]],
      stock_in_out: "Stock-in",
      stock_in: 0,
      stock_out: 0
    })
  }

  fetchProducts = () =>{
    this.adminservice.getAllProductForStock().subscribe(({error,data})=>{
      this.products = data
    })
  }

  addStock = () =>{
    const value = this.stockForm.value
    delete value.stock_in_out
   
    this.adminservice.addStock(value).subscribe(({error,data})=>{
      if(!error){
        this.notif.showSuccess(data)
        this.fetchProductStock()
        this.stockForm.reset()
        this.stockForm.get('stock_in')?.setValue(0)
        this.stockForm.get('stock_out')?.setValue(0)
      }
    })
  }

  fetchProductStock = () =>{
    this.adminservice.getAllStock().subscribe(({error, data})=>{
      let newData = data.map((val: any)=>({...val, isEditEnabled: false}))
      this.dataSource = new MatTableDataSource<any>(newData);
    })
  }

  resetForm = () =>{
    this.stockForm.reset()
    this.stockForm.get('stock_in')?.setValue(0)
    this.stockForm.get('stock_out')?.setValue(0)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getWeightByProduct = (event: any) =>{
    this.adminservice.getWeightByProduct(event.value).subscribe(({data,error})=>{
      this.weightsOfProduct = data
    })
  }

  // deleteProductStock = (id: any) =>{
  //   this.adminservice.deleteStock(id).subscribe(({error, data})=>{
  //     if(!error){
  //       this.notif.showSuccess(data)
  //       this.fetchProductStock()
  //     }
  //   })
  // }

  // editStockById = (id: any) =>{
  //   let data = {
  //     stock_in: this.updateStockIn.value,
  //     stock_out: this.updateStockOut.value
  //   }
    
  //   this.adminservice.editStockById(data,id).subscribe(({error,data})=>{
  //     if(!error){
  //       this.notif.showSuccess(data)
  //       this.fetchProductStock()
  //     }
  //   })
  // }
  changeStockInOut = (e: any) => this.stockForm.get('stock_in_out')?.setValue(e.value);

}

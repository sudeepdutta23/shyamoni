import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';

export interface weightMaster {
  id: string;
  weight: string;
  deliveryCharge: string;
}

@Component({
  selector: 'app-addweight',
  templateUrl: './addweight.component.html',
  styleUrls: ['./addweight.component.css']
})
export class AddweightComponent implements OnInit {
  addWeightMasterForm!: FormGroup;

  editWeightId: any = null;

  editWeight: any = null;

  public displayedColumns: string[] = ['deleteWeight', 'id', 'weight', 'deliveryCharge','editWeight'];

  public dataSource = new MatTableDataSource<any>();

  constructor(private adminservice: AdminService, private fb: FormBuilder, private notif: NotificationComponent) { }

  ngOnInit(): void {
    this.getMasterWeight();
    this.addWeightMasterForm = this.fb.group({
      weight: [null,[Validators.required, Validators.max(2000),Validators.min(1)]],
      deliveryCharge: [{ value: null, disabled: true }]
    })
  }

  getMasterWeight = () =>{
    this.adminservice.getWeightMaster().subscribe(({data, error})=>{
      if(!error){
        this.dataSource = new MatTableDataSource<any>(data);
      }
    })
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;

  }

  enterWeight = (e: any) =>{
    let val = e.currentTarget.value
    if(val > 0 && val <= 500){
      this.addWeightMasterForm.get('deliveryCharge')?.patchValue("49")
    }else if(val >= 501 && val <= 1000){
      this.addWeightMasterForm.get('deliveryCharge')?.patchValue("59")
    }else if(val >= 1001 && val <= 2000){
      this.addWeightMasterForm.get('deliveryCharge')?.patchValue("79")
    }else{
      this.addWeightMasterForm.get('deliveryCharge')?.patchValue("")
    }
  }

  enterEditWeight = (e: any, id) =>{
    let val = e.target.value;
    let delCharge;
    if(val > 0 && val <= 500){
      delCharge = "49";
    }else if(val >= 501 && val <= 1000){
      delCharge = "59";
    }else if(val >= 1001 && val <= 2000){
      delCharge = "79";
    }else{
      delCharge = "";
      this.notif.showInfo("Cannot add more than 2kg of weight")
    }
    let index = this.dataSource.data.findIndex(val=> val.id == id )
    this.dataSource.data[index].weight = val;
    this.dataSource.data[index].deliveryCharge = delCharge;
  }

  addWeightMaster = () =>{
   this.adminservice.addWeightMaster(this.addWeightMasterForm.getRawValue()).subscribe(({data, error})=>{
    if(!error){
      this.notif.showSuccess(data);
      this.getMasterWeight();
      this.addWeightMasterForm.reset()
    }
   })
  }

  deleteWeight = (id) =>{
    console.log(id);
    this.adminservice.deleteWeightMaster(id).subscribe(({data, error})=>{
      if(!error){
        this.notif.showSuccess(data);
        this.getMasterWeight();
      }
    })
  }

  editWeightClicked = (id, weight) =>{
    this.editWeightId = id;
    this.editWeight = weight
  }

  updateMasterWeight = (elem: any) =>{
    if(!elem.weight || !elem.deliveryCharge){
      this.notif.showInfo("Fields cannot be empty")
    }else if(elem.weight.length>4){
      this.notif.showInfo("Cannot add more than 2kg of weight")
    }else{
      this.adminservice.updateWeightMaster(elem.id,{weight: elem.weight, deliveryCharge: elem.deliveryCharge}).subscribe(({data, error})=>{
        if(!error){
          this.notif.showSuccess(data);
          this.editWeightId = null;
          this.editWeight = null;
          this.getMasterWeight();
        }
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

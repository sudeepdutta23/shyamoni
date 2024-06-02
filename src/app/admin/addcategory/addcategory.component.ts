import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { AdminService } from 'src/app/services/admin.service';
export interface PeriodicElement {
  id: string;
  categoryName: string;
  status: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
addCategoryForm!: FormGroup;
isLoading = false;
public files: File[] = [];
public displayedColumns: string[] = ['id', 'categoryName', 'status','created_at', 'updated_at'];
public dataSource = new MatTableDataSource<any>();
  constructor(private adminservice: AdminService, private notif: NotificationComponent, private fb: FormBuilder) {
    this.getCategory();
  }

  ngOnInit(): void {
    this.addCategoryForm = this.fb.group({
      categoryName: [null,[Validators.required]]
    })
  }


  getCategory = () => {
    this.adminservice.getCategories().subscribe(({ error, data }) => {
      this.dataSource = new MatTableDataSource<any>(data);
    });
  }

  addCategory = () => {
    this.isLoading = true;
    const formdata: any = new FormData();
    formdata.append('categoryName',this.addCategoryForm.get('categoryName')?.value);
    this.files.forEach((val:File,i)=>{
      formdata.append("categoryImage",this.files[i])
    })
      this.adminservice.addCategory(formdata).subscribe(({ error, data }) => {
        if(!error){
          this.notif.showSuccess(data)
          this.getCategory();
          this.addCategoryForm.reset()
          this.isLoading = false;
          this.files = [];
        }
      });
  }

  Select = (event: any) =>{
    if(event.addedFiles.length>1){
      this.notif.showInfo('Can only add one file')
      this.files = [];
    }else{
      this.files = event.addedFiles;
    }
  }

  Remove = (event: any) =>{
    this.files.splice(this.files.indexOf(event), 1);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

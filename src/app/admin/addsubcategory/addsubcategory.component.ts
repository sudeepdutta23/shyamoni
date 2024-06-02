import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {MatTableDataSource} from '@angular/material/table';
import { NotificationComponent } from 'src/app/common/notification/notification.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PeriodicElement {
  categoryId: string;
  subCategoryId: string;
  subCategoryName: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-addsubcategory',
  templateUrl: './addsubcategory.component.html',
  styleUrls: ['./addsubcategory.component.css']
})
export class AddsubcategoryComponent implements OnInit {
  addSubcategoryForm!: FormGroup
  isLoading = false;
  public categories: any;
  public subcategories: any;
  public displayedColumns: string[] = ['categoryName','subCategoryName','created_at', 'updated_at'];
  public dataSource = new MatTableDataSource<any>();
  constructor(private adminservice: AdminService, private notif: NotificationComponent, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addSubcategoryForm = this.fb.group({
      selectedCategory: [null,[Validators.required]],
      subCategory: [null,[Validators.required]]
    })
    this.getCategory();
    this.getSubCategory();
  }

  getSubCategory = () =>{
    this.adminservice.getSubCategories().subscribe(({ error, data })=>{
      this.subcategories = data.fetchSubCategory;
      this.dataSource = new MatTableDataSource<any>(data);
    })
  }

  getCategory = () => {
    this.adminservice.getCategories().subscribe(({ error, data })=>{
      this.categories = data
    })
  }

  addSubCategory = () =>{
    this.isLoading = true
      this.adminservice.addSubCategory(this.addSubcategoryForm.get('selectedCategory')?.value,this.addSubcategoryForm.get('subCategory')?.value).subscribe(({ error, data })=>{
        if(!error){
          this.notif.showSuccess(data)
          this.getSubCategory();
          this.addSubcategoryForm.reset()
          this.isLoading = false;
        }
      }) 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

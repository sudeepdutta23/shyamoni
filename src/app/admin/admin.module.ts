import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { SharedModule } from '../shared/shared/shared.module';
import { MaterialModule } from '../shared/shared/material.module';
import { HomeBannerAddComponent } from './home-banner-add/home-banner-add.component';
import { StockComponent } from './stock/stock.component';
import { OrderComponent } from './order/order.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TextEditorComponent } from './text-editor/text-editor.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UsersComponent } from './users/users.component';
import { ProductChildComponent } from './product-child/product-child.component';
import { AddweightComponent } from './addweight/addweight.component';

@NgModule({
  declarations: [
    AddcategoryComponent,
    AddsubcategoryComponent,
    ProductComponent,
    DashboardComponent,
    SidebarComponent,
    AdminComponent,
    HomeComponent,
    AddAboutUsComponent,
    HomeBannerAddComponent,
    StockComponent,
    OrderComponent,
    TextEditorComponent,
    UsersComponent,
    ProductChildComponent,
    AddweightComponent,
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    ImageCropperModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    SharedModule,
    MaterialModule,
  ],
  providers: [],
})
export class AdminModule { }

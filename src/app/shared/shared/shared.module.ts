import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { FilePickerModule } from  'ngx-awesome-uploader';


@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FilePickerModule
  ],
  exports: [
    PaginationComponent,
    FilePickerModule
  ]
})
export class SharedModule { }

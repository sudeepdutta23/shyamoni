import { AdminAuthGuard } from '../guard/admin-auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { AddsubcategoryComponent } from './addsubcategory/addsubcategory.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { AddAboutUsComponent } from './add-about-us/add-about-us.component';
import { HomeBannerAddComponent } from './home-banner-add/home-banner-add.component';
import { StockComponent } from './stock/stock.component';
import { OrderComponent } from './order/order.component';
import { UsersComponent } from './users/users.component';
import { ProductChildComponent } from './product-child/product-child.component';
import { AddweightComponent } from './addweight/addweight.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard], canActivateChild: [AdminAuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'addcategory',
        component: AddcategoryComponent
      },
      {
        path: 'addsubcategory',
        component: AddsubcategoryComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'productChild',
        component: ProductChildComponent
      },
      {
        path: 'addAboutUs',
        component: AddAboutUsComponent
      },
      {
        path: 'homebanneradd',
        component: HomeBannerAddComponent
      },
      {
        path: 'stock',
        component: StockComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'addWeight',
        component: AddweightComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

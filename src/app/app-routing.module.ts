import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CancelpolicyComponent } from './cancelpolicy/cancelpolicy.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { UserAuthGuard } from './guard/user-auth.guard';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { OrdersComponent } from './orders/orders.component';
import { OurproductsComponent } from './ourproducts/ourproducts.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReturnpolicyComponent } from './returnpolicy/returnpolicy.component';
import { SecurepaymentComponent } from './securepayment/securepayment.component';
import { ShippingpolicyComponent } from './shippingpolicy/shippingpolicy.component';
import { SigninComponent } from './signin/signin.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';

const routes: Routes = [
  {
    path: 'home', pathMatch: 'full', component: HomeComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'contactus', pathMatch: 'full', component: ContactusComponent
  },
  {
    path: 'aboutus', pathMatch: 'full', component: AboutusComponent
  },
  {
    path: 'termsandconditions', pathMatch: 'full', component: TermsandconditionsComponent
  },
  {
    path: 'securepayment', pathMatch: 'full', component: SecurepaymentComponent
  },
  {
    path: 'login', pathMatch: 'full', component: SigninComponent
  },
  {
    path: 'register', pathMatch: 'full', component: RegisterComponent
  },
  {
    path: 'forgetPassword', pathMatch: 'full', component: ForgetpasswordComponent
  },
  {
    path: 'cart', pathMatch: 'full', component: CartComponent, canActivate: [UserAuthGuard]
  },
  {
    path: 'ourproducts', pathMatch: 'full', component: OurproductsComponent
  },
  {
    path: 'ourproducts/:terms', pathMatch: 'full', component: OurproductsComponent
  },
  {
    path: 'product/:id', pathMatch: 'full', component: ProductComponent
  },
  {
    path: 'orders', pathMatch: 'full', component: OrdersComponent, canActivate: [UserAuthGuard]
  },
  {
    path: 'invoice/:id', pathMatch: 'full', component: InvoiceComponent, canActivate: [UserAuthGuard]
  },
  {
    path: 'profile', pathMatch: 'full', component: ProfileComponent, canActivate: [UserAuthGuard]
  },
  {
    path: 'privacypolicy', pathMatch: 'full', component: PrivacypolicyComponent
  },
  {
    path: 'cancelpolicy', pathMatch: 'full', component: CancelpolicyComponent
  },
  {
    path: 'returnpolicy', pathMatch: 'full', component: ReturnpolicyComponent
  },
  {
    path: 'shippingpolicy', pathMatch: 'full', component: ShippingpolicyComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

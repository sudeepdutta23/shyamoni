import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LargeScreenComponent } from './header/large-screen/large-screen.component';
import { SmallScreenComponent } from './header/small-screen/small-screen.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { SecurepaymentComponent } from './securepayment/securepayment.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { MiniCartComponent } from './cart/mini-cart/mini-cart.component';
import { OurproductsComponent } from './ourproducts/ourproducts.component';
import { ProductComponent } from './product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCard2Component } from './product-card2/product-card2.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { OrdersComponent } from './orders/orders.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { ProfileComponent } from './profile/profile.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MaterialModule } from './shared/shared/material.module';
import { SharedModule } from './shared/shared/shared.module';
import { ShippingStepsComponent } from './shipping-steps/shipping-steps.component';
import { Modal } from './core/ui/dialogs/modal.service';
import { UserService } from './services/user.service';
import { AdminModule } from './admin/admin.module';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { CancelpolicyComponent } from './cancelpolicy/cancelpolicy.component';
import { ReturnpolicyComponent } from './returnpolicy/returnpolicy.component';
import { ShippingpolicyComponent } from './shippingpolicy/shippingpolicy.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PaymentGatewayModule } from './payment-gateway/payment-gateway.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LargeScreenComponent,
    SmallScreenComponent,
    HomeComponent,
    FooterComponent,
    ContactusComponent,
    AboutusComponent,
    TermsandconditionsComponent,
    SecurepaymentComponent,
    SigninComponent,
    RegisterComponent,
    CartComponent,
    MiniCartComponent,
    OurproductsComponent,
    ProductComponent,
    ForgetpasswordComponent,
    ProductCardComponent,
    ProductCard2Component,
    OrdersComponent,
    InvoiceComponent,
    ProfileComponent,
    ShippingStepsComponent,
    PrivacypolicyComponent,
    CancelpolicyComponent,
    ReturnpolicyComponent,
    ShippingpolicyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    MaterialModule,
    FormsModule,
    NgxSliderModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgOtpInputModule,
    SlickCarouselModule,
    NgxDropzoneModule,
    NgxImageZoomModule,
    AdminModule,
    SharedModule,
    PaymentGatewayModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressAnimation: 'increasing',
      maxOpened:2,
    }),
    SweetAlert2Module.forRoot()
  ],
  providers: [UserService,Modal],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

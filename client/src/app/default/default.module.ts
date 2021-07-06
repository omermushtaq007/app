import { HomeComponent } from './../component/home/home.component';
import { RegisterComponent } from './../component/register/register.component';
import { ContactFormComponent } from '../component/contact-form/contact-form.component';
import { ComponentModule } from './../component/component.module';
import { FooterComponent } from '../component/footer/footer.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { NavbarComponent } from '../component/navbar/navbar.component';
import { CartComponent } from '../cart/cart.component';
import { ForgotPasswordComponent } from '../component/forgot-password/forgot-password.component';
import { LoginComponent } from '../component/login/login.component';
import { VendorComponent } from './vendor/vendor.component';
import { SingleVendorComponent } from './single-vendor/single-vendor.component';

const DefaultRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,

    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'contact-us',
        component: ContactFormComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: RegisterComponent,
      },

      {
        path: 'forgotten-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'vendors',
        component: VendorComponent,
      },
      {
        path: ':id',
        component: SingleVendorComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DefaultComponent,
    NavbarComponent,
    VendorComponent,
    SingleVendorComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forRoot(DefaultRoutes, { onSameUrlNavigation: 'reload' }),
  ],
  exports: [DefaultComponent],
})
export class DefaultModule {}

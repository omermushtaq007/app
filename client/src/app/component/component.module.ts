import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserButtonComponent } from './user-button/user-button.component';
import { NavComponent } from './nav/nav.component';
import { CartComponent } from '../cart/cart.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    UserButtonComponent,
    NavComponent,
    RegisterComponent,
    LoginComponent,
    ContactFormComponent,
    ForgotPasswordComponent,
    CartComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [UserButtonComponent, FooterComponent, NavComponent, RegisterComponent],
})
export class ComponentModule {}

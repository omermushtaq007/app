import { AuthGuard } from './../auth/auth.guard';
import { ComponentModule } from './../component/component.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { VendorComponent } from './vendor/vendor.component';
import { CertificateComponent } from './certificate/certificate.component';
import { ExamComponent } from './exam/exam.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './customer/customer.component';

const AdminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'vendor',
        component: VendorComponent,
      },
      {
        path: 'certification',
        component: CertificateComponent,
      },
      {
        path: 'exams',
        component: ExamComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent
      }
    ],
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    VendorComponent,
    CertificateComponent,
    ExamComponent,
    CustomerComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    RouterModule.forRoot(AdminRoutes,{onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}

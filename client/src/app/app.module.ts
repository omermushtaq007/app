import { DefaultModule } from './default/default.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthService } from './service/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DefaultModule,
    DashboardModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UserService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

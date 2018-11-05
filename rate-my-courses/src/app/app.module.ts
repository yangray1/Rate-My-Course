import { RequestReportService } from './_services/request-report.service';
import { LoginService } from './_services/login.service';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './login/register/register.component';
import { EditUserComponent } from './admin-dashboard/edit-user/edit-user.component';
import { RespondRequestComponent } from './admin-dashboard/respond-request/respond-request.component';
import { RespondReportComponent } from './admin-dashboard/respond-report/respond-report.component';
import { UsersService } from './_services/users.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    NavbarComponent,
    RegisterComponent,
    EditUserComponent,
    RespondRequestComponent,
    RespondReportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
  ],
  entryComponents: [
    RegisterComponent,
    EditUserComponent,
    RespondReportComponent,
    RespondRequestComponent
  ],
  providers: [
    LoginService,
    RequestReportService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

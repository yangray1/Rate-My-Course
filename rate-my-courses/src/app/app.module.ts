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
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './login/register/register.component';
import { EditUserComponent } from './admin-dashboard/edit-user/edit-user.component';
import { RespondRequestComponent } from './admin-dashboard/respond-request/respond-request.component';
import { RespondReportComponent } from './admin-dashboard/respond-report/respond-report.component';
import { UsersService } from './_services/users.service';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { StickyHeaderComponent } from './sticky-header/sticky-header.component';
import { SearchCourseComponent } from './search-course/search-course.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MyRatingsComponent } from './my-ratings/my-ratings.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { WriteReviewComponent } from './write-review/write-review.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    NavBarComponent,
    HomeComponent,
    StickyHeaderComponent,
    SearchCourseComponent,
    MyRatingsComponent,
    WriteReviewComponent,
    ReportUserComponent,
    UserProfileComponent,
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
    RespondRequestComponent,
    LoginComponent,
    WriteReviewComponent,
  ],
  providers: [
    LoginService,
    RequestReportService,
    UsersService,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

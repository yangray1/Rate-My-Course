import { NewCourseComponent } from 'src/app/new-course/new-course.component';
import { RequestReportService } from './_services/request-report.service';
import { LoginService } from './_services/login.service';

import { ReviewService } from './_services/review.service';

import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent, InvalidUsernamePasswordDialogComponent } from './login/login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent, UsernameTakenComponent } from './login/register/register.component';
import { EditUserComponent } from './admin-dashboard/edit-user/edit-user.component';
import { UsersService } from './_services/users.service';
import { HomeComponent } from './home/home.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatTabsModule, MatInputModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { ReviewsComponent } from './reviews/reviews.component';
import { EditProfileComponent } from './user-dashboard/edit-profile/edit-profile.component';
import { EditCoursesComponent } from './user-dashboard/edit-courses/edit-courses.component';
import { EditReviewComponent } from './user-dashboard/edit-review/edit-review.component';
import { NewCourseDialogComponent } from './user-dashboard/edit-courses/new-course-dialog/new-course-dialog.component';
import { ReportDialogComponent } from './reviews/report-dialog/report-dialog.component';
import { SuggestionDialogComponent } from './navbar/suggestion-dialog/suggestion-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { NewReviewComponent } from './new-review/new-review.component';

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
    HomeComponent,
    ReviewsComponent,
    EditProfileComponent,
    EditCoursesComponent,
    EditReviewComponent,
    NewCourseComponent,
    NewCourseDialogComponent,
    ReportDialogComponent,
    SuggestionDialogComponent,
    InvalidUsernamePasswordDialogComponent,
    UsernameTakenComponent,
    NewReviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    LayoutModule,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ],
  entryComponents: [
    RegisterComponent,
    EditUserComponent,
    LoginComponent,
    EditProfileComponent,
    EditCoursesComponent,
    NewCourseDialogComponent,
    ReportDialogComponent,
    SuggestionDialogComponent,
    InvalidUsernamePasswordDialogComponent,
    UsernameTakenComponent,
    NewReviewComponent,
  ],
  providers: [
    LoginService,
    RequestReportService,
    UsersService,
    ReviewService,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    LayoutModule,
    MatTabsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

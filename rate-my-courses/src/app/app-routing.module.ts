import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { MyRatingsComponent } from 'src/app/my-ratings/my-ratings.component';
import { LoginComponent } from './login/login.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import { ReportUserComponent } from './report-user/report-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

// const routes: Routes = [
//   //paths are localhost:4200/login , /user-dashboard, etc
//   // Redirects to that page & display its html
//   { path: 'login', component: LoginComponent },
//   { path: 'user-dashboard', component: UserDashboardComponent },
//   { path: 'admin-dashboard', component: AdminDashboardComponent },
//   { path: 'write-review', component: WriteReviewComponent},
//   { path: 'report-user', component: ReportUserComponent},
//   { path: 'user-profile', component: UserProfileComponent},
//   { path: 'reported-reviews', component: ReportedReviewsComponent},


  const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'search-course', component: SearchCourseComponent},
    {path: 'my-ratings', component: MyRatingsComponent},
    { path: 'admin-dashboard', component: AdminDashboardComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

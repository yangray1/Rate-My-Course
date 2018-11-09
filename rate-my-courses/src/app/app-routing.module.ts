import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { ReviewsComponent } from './reviews/reviews.component';

// const routes: Routes = [
//   //paths are localhost:4200/login , /user-dashboard, etc
//   // Redirects to that page & display its html
//   { path: 'login', component: LoginComponent },
//   { path: 'user-dashboard', component: UserDashboardComponent },
//   { path: 'admin-dashboard', component: AdminDashboardComponent },
//   { path: 'write-review', component: WriteReviewComponent},
//   { path: 'report-user', component: ReportUserComponent},
//   { path: 'reported-reviews', component: ReportedReviewsComponent},


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'user-dashboard/:username', component: UserDashboardComponent},
  { path: 'view-reviews/:course', component: ReviewsComponent},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

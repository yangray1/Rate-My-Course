import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchCourseComponent } from './search-course/search-course.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search-course', component: SearchCourseComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

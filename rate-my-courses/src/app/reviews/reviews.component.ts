import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material';
import { CoursesService } from 'src/app/_services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Review } from '../review';

import { ReviewService } from '../_services/review.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  course: string;
  courseDesc: string;
  allReviews: Review[];

  courseFound = true;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.course = params.course; // Pass in later during the course searchbar
      this.courseFound = this.coursesService.getAllCourses().includes(params.course);
      if (this.courseFound) {
        this.courseDesc = this.coursesService.getCourseDesc(this.course);
        this.reviewService.getReviews(this.course).subscribe(reviews => {
          this.allReviews = reviews;
        });
      }
      console.log(params.course);
    });
  }

  courseAdded() {
    this.courseFound = true;
    console.log(this.courseFound);
  }

  report(review: Review) {
    console.log(review);
    this.matDialog.open(
      ReportDialogComponent,
      {
        data: { review: review },
        width: '400px',
      }
    );
  }
}

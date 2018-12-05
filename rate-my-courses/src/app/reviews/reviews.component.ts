import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material';
import { CoursesService } from 'src/app/_services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Review } from '../review';

import { ReviewService } from '../_services/review.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  course: string;
  courseDesc: string;
  courseName: string;
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
      this.coursesService.getAllCourses().subscribe(
        (allCourses) => {

          this.courseFound = allCourses.map(course => course.courseCode).includes(params.course);
          if (this.courseFound) {
            this.coursesService.getCourse(this.course).subscribe(
              (course) => {
                this.courseName = course.courseName;
                this.courseDesc = course.courseDesc;
              }
            )
            this.reviewService.getReviews(this.course).subscribe(reviews => {
              this.allReviews = reviews;
              console.log(this.allReviews);
            });
          }
        }
      )
      console.log(params.course);
    });
  }

  courseAdded() {
    this.coursesService.getCourse(this.course).subscribe(courseObject => {
      this.courseDesc = courseObject.courseDesc;
      this.courseFound = true;
    })
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

  upvoteReview(review: Review) {
    this.reviewService.upvoteReview(review).subscribe((result) => {
      console.log(result);
      this.reviewService.getReviews(this.course).subscribe(reviews => {
        this.allReviews = reviews;
        console.log(this.allReviews);
      });
    })
  }

  downvoteReview(review: Review) {
    this.reviewService.downvoteReview(review).subscribe((result) => {
      console.log(result);
      this.reviewService.getReviews(this.course).subscribe(reviews => {
        this.allReviews = reviews;
        console.log(this.allReviews);
      });
    })
  }
}

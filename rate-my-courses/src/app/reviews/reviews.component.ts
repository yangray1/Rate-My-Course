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
  allReviews: Review[];

  courseFound = true;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.course = params.course; // Pass in later during the course searchbar
      this.courseFound = this.coursesService.getAllCourses().includes(params.course);
      if (this.courseFound) {
        this.courseDesc = this.coursesService.getCourseDesc(this.course);
        this.allReviews = this.reviewService.getReviews(this.course);
      }
      console.log(params.course);
    });
  }

  courseAdded() {
    this.courseFound = true;
    console.log(this.courseFound);
  }
}

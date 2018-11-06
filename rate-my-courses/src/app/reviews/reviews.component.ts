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
  allReviews: Review[];

  constructor(private reviewService: ReviewService) {
    this.course = 'CSC209'; // Pass in later during the course searchbar
    this.allReviews = this.reviewService.getReviews(this.course);
  }

  ngOnInit() {
  }
}

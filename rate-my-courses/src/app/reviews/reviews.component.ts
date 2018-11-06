import { Component, OnInit } from '@angular/core';
import { REVIEWS } from '../hardcoded-reviews'
import { Review } from '../review' 

import { ReviewService } from '../_services/review.service'
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  allReviews: Review[];

  constructor(private reviewService: ReviewService) { 
    this.allReviews = reviewService.getReviews();
    // alert(reviewService.allReviews.length);
  }

  getReviews(){
    // this.allReviews = this.reviewService.getReviews();
  }

  ngOnInit() {
  }

}

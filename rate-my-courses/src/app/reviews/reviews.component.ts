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

  allReviews;

  constructor(private reviewService: ReviewService) { 
  }

  getReviews(){
    this.allReviews = this.reviewService.getReviews();
  }

  ngOnInit() {
    this.allReviews = this.reviewService.getReviews();
  }

}

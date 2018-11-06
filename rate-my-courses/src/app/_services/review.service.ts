import { Injectable } from '@angular/core';
import { REVIEWS } from '../hardcoded-reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private allReviews: Review[];

  constructor(
  ) {
    this.allReviews = REVIEWS;
  }

  getReviews(): Review[]{
    return this.allReviews;
  }

  deleteReview(review: Review) {
  }

  addReview(review: Review){
    this.allReviews.push(review);
  }
}


export interface Review {

}

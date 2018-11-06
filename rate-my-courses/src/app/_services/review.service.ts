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

  getReviews(){
    return this.allReviews;
  }

  deleteReview(review: Review) {
  }

  addReview(){
    this.allReviews.push({course: "CSC209", reviewer: "Yuh", profName: "E Z", overallRating: 4, difficulty: 1, workload: 1, hoursPerWeek: 3, textbookUsed: true, gradeReceived: "A+", writtenReview: "testing", score: 0});
    // alert(this.allReviews.length);
    // return REVIEWS;
  }
}


export interface Review {

}

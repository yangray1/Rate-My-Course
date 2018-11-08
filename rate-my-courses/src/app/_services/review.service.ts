import { Injectable } from '@angular/core';
import { REVIEWS } from './hardcoded-reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private allReviews: Review[] = [];

  constructor() {
    this.allReviews = REVIEWS;
  }

  getReviews(course: string): Review[] {
    return this.allReviews.filter(review => review.course === course);
  }

  getReviewsByUser(username: string): Review[] {
    return this.allReviews.filter(review => review.reviewer === username);
  }

  deleteReview(review: Review) {
    this.allReviews = this.allReviews.filter(e => e !== review);
  }

  addReview(review: Review) {
    this.allReviews.push(review);
  }

  saveReview(review: Review, origReview: Review) {
    this.deleteReview(origReview);
    this.addReview(review);
  }
}

export interface Review {
  course: string;
  reviewer: string;
  profName: string;
  overallRating: number;
  difficulty: number;
  workload: number;
  hoursPerWeek: number;
  textbookUsed: boolean;
  gradeReceived: string;
  writtenReview: string;
  score: number;
}

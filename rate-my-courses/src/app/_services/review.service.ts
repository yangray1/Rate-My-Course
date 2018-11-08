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
  }

  addReview(review: Review) {
    this.allReviews.push(review);
  }

  getAllCourses() {
    return this.allReviews.map(review => review.course);
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

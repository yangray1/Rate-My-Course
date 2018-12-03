import { Injectable } from '@angular/core';
import { REVIEWS } from './hardcoded-reviews';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let count = 3;
@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  private API = 'http://localhost:3000'
  private REVIEW_API = this.API + '/api/review';

  private allReviews: Review[] = [];

  constructor(private http: HttpClient) {
    this.allReviews = REVIEWS;
  }

  getReviews(course: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.REVIEW_API + "/getReviewByCourse/" + course, this.getHttpHeaders())
  }

  getReviewsByUser(username: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.REVIEW_API + "/getReviewByUser/" + username, this.getHttpHeaders())
  }

  deleteReview(review: Review): Observable<Review> {
    this.allReviews = this.allReviews.filter(e => e.id !== review.id);
    return this.http.delete<Review>(this.REVIEW_API + "/delete-review", this.getHttpHeaders())
  }

  addReview(review: Review): Observable<Review> {
    this.allReviews.push(review);
    return this.http.post<Review>(this.REVIEW_API + "/add-review", this.getHttpHeaders())
  }

  saveReview(review: Review): Observable<Review> {
    this.addReview(review);
    return this.http.patch<Review>(this.REVIEW_API + "/edit-review", this.getHttpHeaders())
  }

  next() {
    count += 1;
    return count;
  }
  private getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken') || ''
      })
    };
  }
}

export interface Review {
  id: number;
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

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ReviewService {

  private API = 'https://rate-my-courses.herokuapp.com';
  // private API = 'http://localhost:3000'
  private REVIEW_API = this.API + '/api/review';

  constructor(private http: HttpClient) {
  }

  getReviews(course: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.REVIEW_API + "/getReviewByCourse/" + course, this.getHttpHeaders())
  }

  getReviewsByUser(username: string): Observable<Review[]> {
    return this.http.get<Review[]>(this.REVIEW_API + "/getReviewByUser/" + username, this.getHttpHeaders())
  }

  deleteReview(review: any): Observable<Review> {
    return this.http.delete<Review>(this.REVIEW_API + "/delete-review", this.getHttpHeaders())
  }

  addReview(review: any): Observable<Review> {
    console.log(review);
    return this.http.post<Review>(this.REVIEW_API + "/add-review", review, this.getHttpHeaders())
  }

  saveReview(review: any): Observable<Review> {
    return this.http.patch<Review>(this.REVIEW_API + "/edit-review", review, this.getHttpHeaders())
  }

  upvoteReview(review: any): Observable<Review> {
    return this.http.patch<Review>(this.REVIEW_API + "/upvote", review, this.getHttpHeaders())
  }

  downvoteReview(review: any): Observable<Review> {
    return this.http.patch<Review>(this.REVIEW_API + "/downvote", review, this.getHttpHeaders())
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
  active: boolean;
}

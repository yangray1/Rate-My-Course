import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ReviewsComponent } from '../reviews/reviews.component'
import { ReviewService } from '../_services/review.service'
import { Review } from '../review';


@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  
  reviewForm = this.fb.group({
    course: [null, Validators.required],
    overallRating: [null, Validators.required],
    levelOfDifficulty: [null, Validators.required],
    workload: [null, Validators.required],
    hoursPerWeek: [null, Validators.required],
    textbookUsed: [null],
    grade: [null, Validators.required],
    major: [null, Validators.required],
    comments: [null],
    termsOfService: [null, Validators.requiredTrue],
  });

  submitted = false;
  success = false;

  grades: Grade[] = [
    {grade: 'A+', gradeValue: 'A+'},
    {grade: 'A', gradeValue: 'A'},
    {grade: 'A-', gradeValue: 'A-'},
    {grade: 'B+', gradeValue: 'B+'},
    {grade: 'B', gradeValue: 'B'},
    {grade: 'B-', gradeValue: 'B-'},
    {grade: 'C+', gradeValue: 'C+'},
    {grade: 'C', gradeValue: 'C'},
    {grade: 'C-', gradeValue: 'C-'},
    {grade: 'D+', gradeValue: 'D+'},
    {grade: 'D', gradeValue: 'D'},
    {grade: 'D-', gradeValue: 'D-'},
    {grade: 'F', gradeValue: 'F'}
  ];
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private reviewService: ReviewService
    ) { 
      // reviewService.addReview();
    }

  ngOnInit() {
  }


  onSubmit(reviewService: ReviewService){
    this.submitted = true;
    if (this.reviewForm.invalid){
      alert("Invalid fields. Please fill in all the required fields.");
      return;
    }
    this.success = true;

    // reviewService.addReview();
    let x = new Review(reviewService)
    
    this.router.navigate(
      ['../user-dashboard'],
      { relativeTo: this.activeRoute }
    );

  }
}
export interface Grade {
  grade: string;
  gradeValue: string;
}
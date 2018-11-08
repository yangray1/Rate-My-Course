import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ReviewsComponent } from '../reviews/reviews.component'
import { ReviewService } from '../_services/review.service'
import { Review } from '../review';
import { Observable } from 'rxjs';
import { CoursesService } from '../_services/courses.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {

  reviewForm = this.fb.group({
    course: [null, Validators.required],
    profName: [null, Validators.required],
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

  searchCourse: string;
  courses: string[];

  filteredCourses: Observable<string[]>;

  submitted = false;
  success = false;

  grades: Grade[] = [
    { grade: 'A+', gradeValue: 'A+' },
    { grade: 'A', gradeValue: 'A' },
    { grade: 'A-', gradeValue: 'A-' },
    { grade: 'B+', gradeValue: 'B+' },
    { grade: 'B', gradeValue: 'B' },
    { grade: 'B-', gradeValue: 'B-' },
    { grade: 'C+', gradeValue: 'C+' },
    { grade: 'C', gradeValue: 'C' },
    { grade: 'C-', gradeValue: 'C-' },
    { grade: 'D+', gradeValue: 'D+' },
    { grade: 'D', gradeValue: 'D' },
    { grade: 'D-', gradeValue: 'D-' },
    { grade: 'F', gradeValue: 'F' }
  ];
  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private reviewService: ReviewService,
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.courses = this.coursesService.getAllCourses();
    this.filteredCourses = this.reviewForm.controls['course'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }


  onSubmit(reviewService: ReviewService) {
    this.submitted = true;
    if (this.reviewForm.invalid) {
      alert("Invalid fields. Please fill in all the required fields.");
      return;
    }
    this.success = true;

    let course = this.reviewForm.controls['course'].value;
    let profName = this.reviewForm.controls['profName'].value;
    let overallRating = this.reviewForm.controls['overallRating'].value;
    let levelOfDifficulty = this.reviewForm.controls['levelOfDifficulty'].value;
    let workload = this.reviewForm.controls['workload'].value;
    let hoursPerWeek = this.reviewForm.controls['hoursPerWeek'].value; // string
    let textbookUsed = this.reviewForm.controls['textbookUsed'].value;
    let grade = this.reviewForm.controls['grade'].value;
    let major = this.reviewForm.controls['major'].value;
    let comments = this.reviewForm.controls['comments'].value;

    // alert(hoursPerWeek.constructor.name)

    let reviewToAdd = {
      course: course,
      reviewer: "GetLoggedInUser Here!",
      profName: profName,
      overallRating: overallRating,
      difficulty: levelOfDifficulty,
      workload: workload,
      hoursPerWeek: hoursPerWeek,
      textbookUsed: textbookUsed,
      gradeReceived: grade,
      writtenReview: comments,
      score: 0
    }

    this.reviewService.addReview(reviewToAdd);

    this.router.navigate(
      ['../user-dashboard'],
      { relativeTo: this.activeRoute }
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses.filter(course => course.includes(filterValue));
  }
}
export interface Grade {
  grade: string;
  gradeValue: string;
}
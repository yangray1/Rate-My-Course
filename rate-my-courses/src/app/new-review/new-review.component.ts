import { ReviewService } from './../_services/review.service';
import { CoursesService, Course } from "./../_services/courses.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { User } from "../_services/users.service";

@Component({
  selector: "app-new-review",
  templateUrl: "./new-review.component.html",
  styleUrls: ["./new-review.component.scss"]
})
export class NewReviewComponent implements OnInit {
  grades: Grade[] = [
    { grade: "A+", gradeValue: "A+" },
    { grade: "A", gradeValue: "A" },
    { grade: "A-", gradeValue: "A-" },
    { grade: "B+", gradeValue: "B+" },
    { grade: "B", gradeValue: "B" },
    { grade: "B-", gradeValue: "B-" },
    { grade: "C+", gradeValue: "C+" },
    { grade: "C", gradeValue: "C" },
    { grade: "C-", gradeValue: "C-" },
    { grade: "D+", gradeValue: "D+" },
    { grade: "D", gradeValue: "D" },
    { grade: "D-", gradeValue: "D-" },
    { grade: "F", gradeValue: "F" }
  ];

  addressForm = this.fb.group({
    courseCode: [null, Validators.required],
    professor: [null, Validators.required],
    overallRating: [null, Validators.required],
    difficulty: [null, Validators.required],
    workload: [null, Validators.required],
    hours: [null, Validators.required],
    grade: [null, Validators.required],
    description: [null, Validators.required],
    textbookUsed: [null, Validators.required],
  });

  hasUnitNumber = false;

  yearOfStudy = 1;

  searchCourse: string;
  courses: string[];

  searchBarControl: FormControl = new FormControl();
  filteredCourses: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((allCourses: Course[]) => {
      this.courses = allCourses.map(course => course.courseCode);
    });

    this.filteredCourses = this.searchBarControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.searchBarControl.valueChanges.subscribe(value => {
      this.searchCourse = value;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses
      ? this.courses.filter(course => course.includes(filterValue))
      : [];
  }

  onSubmit() {
    this.reviewService.addReview({
      course: this.searchBarControl.value,
      reviewer: localStorage.getItem('username'),
      profName: this.addressForm.controls['professor'].value,
      overallRating: this.addressForm.controls['overallRating'].value,
      difficulty: this.addressForm.controls['difficulty'].value,
      workload: this.addressForm.controls['workload'].value,
      hoursPerWeek: this.addressForm.controls['hours'].value,
      gradeReceived: this.addressForm.controls['grade'].value,
      textbookUsed:  this.addressForm.controls['textbookUsed'].value,
      writtenReview: this.addressForm.controls['description'].value,
      score: 0
    }).subscribe(savedReview => {
      console.log(savedReview);
    });
  }
}

export interface Grade {
  grade: string;
  gradeValue: string;
}

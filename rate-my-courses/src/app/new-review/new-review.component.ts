import { ReviewService } from "./../_services/review.service";
import { CoursesService, Course } from "./../_services/courses.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, Validators, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { User } from "../_services/users.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { EditUserComponent } from "../admin-dashboard/edit-user/edit-user.component";

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
    textbookUsed: [null, Validators.required]
  });

  hasUnitNumber = false;

  yearOfStudy = 1;

  isNew;

  searchCourse: string;
  courses: string[];

  searchBarControl: FormControl = new FormControl();
  filteredCourses: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private reviewService: ReviewService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit(): void {
    this.isNew = this.data.isNew;
    if (!this.isNew) {
      this.searchBarControl.setValue(this.data.course);
      this.addressForm.controls["professor"].setValue(
        this.data.profName
      );
      this.addressForm.controls["overallRating"].setValue(
        this.data.overallRating
      );
      this.addressForm.controls["difficulty"].setValue(this.data.difficulty);
      this.addressForm.controls["workload"].setValue(this.data.workload);
      this.addressForm.controls["hours"].setValue(this.data.hoursPerWeek);
      this.addressForm.controls["grade"].setValue(this.data.gradeReceived);
      this.addressForm.controls["textbookUsed"].setValue(
        this.data.textbookUsed
      );
      this.addressForm.controls["description"].setValue(
        this.data.writtenReview
      );
    } else {
      this.addressForm.controls["textbookUsed"].setValue(
        false
      );
    }
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
    if (this.isNew) {
      this.reviewService
        .addReview({
          course: this.searchBarControl.value,
          reviewer: localStorage.getItem("username"),
          profName: this.addressForm.controls["professor"].value,
          overallRating: this.addressForm.controls["overallRating"].value,
          difficulty: this.addressForm.controls["difficulty"].value,
          workload: this.addressForm.controls["workload"].value,
          hoursPerWeek: this.addressForm.controls["hours"].value,
          gradeReceived: this.addressForm.controls["grade"].value,
          textbookUsed: this.addressForm.controls["textbookUsed"].value,
          writtenReview: this.addressForm.controls["description"].value,
          score: 5
        })
        .subscribe(savedReview => {
          console.log(savedReview);
          this.dialogRef.close(true);
        });
    } else {
      this.data.professor = this.addressForm.controls["professor"].value;
      this.data.overallRating = this.addressForm.controls[
        "overallRating"
      ].value;
      this.data.difficulty = this.addressForm.controls["difficulty"].value;
      this.data.workload = this.addressForm.controls["workload"].value;
      this.data.hoursPerWeek = this.addressForm.controls["hours"].value;
      this.data.gradeReceived = this.addressForm.controls["grade"].value;
      this.data.textbookUsed = this.addressForm.controls["textbookUsed"].value;
      this.data.writtenReview = this.addressForm.controls["description"].value;
      this.reviewService.saveReview(this.data).subscribe(savedReview => {
        console.log(savedReview);
        this.dialogRef.close(true);
      });
    }
  }
}

export interface Grade {
  grade: string;
  gradeValue: string;
}

import { Course } from "./../../../_services/courses.service";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { CoursesService } from "src/app/_services/courses.service";
import { EditUserComponent } from "src/app/admin-dashboard/edit-user/edit-user.component";
import { Observable } from "rxjs";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-new-course-dialog",
  templateUrl: "./new-course-dialog.component.html",
  styleUrls: ["./new-course-dialog.component.scss"]
})
export class NewCourseDialogComponent implements OnInit {
  addressForm = this.fb.group({
    courseCode: null,
    courseName: null,
    courseDesc: null
  });

  isAdmin = false;
  newCourse: string;

  origCourse: Course;
  searchCourse: string;
  courses: string[];

  searchBarControl: FormControl = new FormControl();
  filteredCourses: Observable<string[]>;
  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private coursesService: CoursesService
  ) {}

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses
      ? this.courses.filter(course => course.includes(filterValue))
      : [];
  }

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe(allCourses => {
      this.courses = allCourses.map(course => course.courseCode);
    });
    this.filteredCourses = this.searchBarControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    this.searchBarControl.valueChanges.subscribe(value => {
      this.searchCourse = value;
    });

    console.log(this.data);

    this.isAdmin = this.data.isAdmin;
    this.newCourse = this.data.course.courseCode;
    this.origCourse = this.data.course;
    this.addressForm.controls["courseCode"].setValue(this.newCourse);
    this.addressForm.controls["courseName"].setValue(
      this.data.course.courseName
    );
    this.addressForm.controls["courseDesc"].setValue(
      this.data.course.courseDesc
    );
  }

  onSubmit() {
    this.courseService
      .addCourse({
        courseCode: this.addressForm.controls["courseCode"].value,
        courseName: this.addressForm.controls["courseName"].value,
        courseDesc: this.addressForm.controls["courseDesc"].value
      })
      .subscribe(savedCourses => {
        this.dialogRef.close(true);
      });
  }
}

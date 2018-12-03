import { Course } from './../../../_services/courses.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CoursesService } from 'src/app/_services/courses.service';
import { EditUserComponent } from 'src/app/admin-dashboard/edit-user/edit-user.component';

@Component({
  selector: 'app-new-course-dialog',
  templateUrl: './new-course-dialog.component.html',
  styleUrls: ['./new-course-dialog.component.scss'],
})
export class NewCourseDialogComponent implements OnInit {
  addressForm = this.fb.group({
    courseCode: null,
    courseName: null,
    courseDesc: null,
  });

  isAdmin = false;
  newCourse: string;

  origCourse: Course;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit() {
    this.isAdmin = this.data.isAdmin;
    this.newCourse = this.data.course.courseCode;
    this.origCourse = this.data.course;
    this.addressForm.controls['courseCode'].setValue(this.newCourse);
    this.addressForm.controls['courseName'].setValue(this.data.course.courseName);
    this.addressForm.controls['courseDesc'].setValue(this.data.course.courseDesc);
  }

  onSubmit() {
    this.courseService.saveCourse({
      courseCode: this.addressForm.controls['courseCode'].value,
      courseName: this.addressForm.controls['courseName'].value,
      courseDesc: this.addressForm.controls['courseDesc'].value
    });
    this.dialogRef.close(true);
  }
}

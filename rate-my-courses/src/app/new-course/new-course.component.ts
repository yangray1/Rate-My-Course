import { CoursesService } from './../_services/courses.service';
import { Component, Input, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {
  addressForm = this.fb.group({
    courseCode: null,
    courseName: null,
    courseDesc: null,
  });

  @Input() newCourse;

  @Output() courseAdded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
  ) {
  }

  ngOnInit() {

    this.addressForm.controls['courseCode'].setValue(this.newCourse);
  }

  onSubmit() {
    this.courseService.addCourse({
      courseCode: this.addressForm.controls['courseCode'].value,
      courseName: this.addressForm.controls['courseName'].value,
      courseDesc: this.addressForm.controls['courseDesc'].value
    });
    this.courseAdded.emit(true);
  }
}

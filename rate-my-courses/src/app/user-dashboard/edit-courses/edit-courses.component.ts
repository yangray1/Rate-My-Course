import { NewCourseDialogComponent } from "./new-course-dialog/new-course-dialog.component";
import { Component, OnInit, Inject } from "@angular/core";
import { UsersService, User } from "src/app/_services/users.service";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { EditUserComponent } from "src/app/admin-dashboard/edit-user/edit-user.component";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { CoursesService } from "src/app/_services/courses.service";
import { startWith, map } from "rxjs/operators";
import { NewCourseComponent } from "src/app/new-course/new-course.component";

@Component({
  selector: "app-edit-courses",
  templateUrl: "./edit-courses.component.html",
  styleUrls: ["./edit-courses.component.scss"]
})
export class EditCoursesComponent implements OnInit {
  user: User;

  currentlyTaking: string[];
  taken: string[];

  searchCourse: string;
  courses: string[];

  searchBarControl: FormControl = new FormControl();
  filteredCourses: Observable<string[]>;

  constructor(
    private userService: UsersService,
    private coursesService: CoursesService,
    private matDialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data;
    this.currentlyTaking = this.user.courses;
    this.taken = this.user.takenCourses;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses
      ? this.courses.filter(course => course.includes(filterValue))
      : [];
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
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
  }

  add(course?) {
    if (!this.courses.includes(course ? course : this.searchCourse)) {
      this.matDialog
        .open(NewCourseDialogComponent, {
          data: {
            course: {
              courseCode: this.searchCourse,
              courseName: "",
              courseDesc: ""
            },
            idAdmin: false
          },
          width: "500px"
        })
        .afterClosed()
        .subscribe(result => {
          if (result) {
            this.currentlyTaking.push(this.searchCourse);
          }
        });
    } else {
      this.currentlyTaking.push(this.searchCourse);
    }
  }

  deleteTaken(course: string) {
    console.log(course);
    this.taken = this.taken.filter(cs => cs !== course);
    console.log(this.taken);
  }

  deleteTaking(course: string) {
    console.log(course);
    this.currentlyTaking = this.currentlyTaking.filter(cs => cs !== course);
    console.log(this.currentlyTaking);
  }

  save() {
    this.user.courses = this.currentlyTaking;
    this.user.takenCourses = this.taken;
    this.userService.saveUser(this.user).subscribe(savedUser => {
      console.log(savedUser);
      this.dialogRef.close();
    });
    console.log(this.user);
  }
}

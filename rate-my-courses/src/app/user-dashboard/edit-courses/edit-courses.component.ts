import { Component, OnInit, Inject } from '@angular/core';
import { UsersService, User } from 'src/app/_services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditUserComponent } from 'src/app/admin-dashboard/edit-user/edit-user.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CoursesService } from 'src/app/_services/courses.service';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.scss']
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
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.courses = this.coursesService.getAllCourses();
    this.user = data;
    this.currentlyTaking = this.user.courses;
    this.taken = this.user.takenCourses;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses.filter(course => course.includes(filterValue));
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  ngOnInit() {
    this.filteredCourses = this.searchBarControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.searchBarControl.valueChanges.subscribe(value => {
      this.searchCourse = value;
    });
  }

  add() {
    this.currentlyTaking.push(this.searchCourse);
  }

  deleteTaken(course: string) {
    this.taken.slice(this.taken.indexOf(course), 1);
  }

  deleteTaking(course: string) {
    this.currentlyTaking.slice(this.currentlyTaking.indexOf(course), 1);
  }

  save() {
    this.user.courses = this.currentlyTaking;
    this.user.takenCourses = this.taken;
    this.userService.saveUser(this.user, this.user.username);
    console.log(this.user);
    this.dialogRef.close();
  }
}

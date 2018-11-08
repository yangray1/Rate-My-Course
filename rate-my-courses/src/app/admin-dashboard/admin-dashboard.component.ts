import { CoursesService } from 'src/app/_services/courses.service';
import { Course } from './../_services/courses.service';
import { RequestReportService } from './../_services/request-report.service';
import { UsersService } from './../_services/users.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RespondRequestComponent } from './respond-request/respond-request.component';
import { RespondReportComponent } from './respond-report/respond-report.component';
import { NewCourseDialogComponent } from '../user-dashboard/edit-courses/new-course-dialog/new-course-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  displayedColumns: string[] = ['username', 'description'];
  cards: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UsersService,
    private requestReportService: RequestReportService,
    private matDialog: MatDialog,
    private courseService: CoursesService
  ) {
  }

  ngOnInit() {
    this.setCards();
  }

  // what happens when you click on that box.
  select(row: any) {
    let matDialogRef: MatDialogRef<any>;
    if (row.content.type === 'user') {
      matDialogRef = this.matDialog.open(
        EditUserComponent,
        {
          data: row.content.user,
          width: '500px',
        }
      );
      matDialogRef.afterClosed().subscribe((_) => {
        this.setCards();
      });
    } else if (row.content.type === 'request') {
      matDialogRef = this.matDialog.open(
        RespondRequestComponent,
        { data: row.content }
      );
    } else if (row.content.type === 'report') {
      matDialogRef = this.matDialog.open(
        RespondReportComponent,
        {
          data: row.content,
          width: '500px',
        }
      );
    } else if (row.content.type === 'course') {
      this.matDialog.open(
        NewCourseDialogComponent,
        {
          data: { course: row.content.description, isAdmin: true },
          width: '500px',
        }
      ).afterClosed().subscribe(result => {
        if (result) {
          this.ngOnInit();
        }
      });
    }
  }

  setCards() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {

        const allUsers: TableData[] = [];
        const allCourses: TableData[] = [];

        this.userService.getAllUsers().forEach(user => {
          allUsers.push({
            username: user.username,
            description: user.firstName + ' ' + user.lastName,
            content: { type: 'user', user: user }
          });
        });

        this.courseService.getAllCourseObjects().forEach((course: Course) => {
          allCourses.push({
            username: course.courseCode,
            description: course.courseName,
            content: { type: 'course', description: course }
          });
        });
        if (matches) {
          return [
            { title: 'Requests', cols: 4, rows: 2, tableData: this.requestReportService.getAllRequests() },
            { title: 'Reports', cols: 4, rows: 3, tableData: this.requestReportService.getAllReports() },
            { title: 'Users', cols: 4, rows: 2, tableData: allUsers },
            { title: 'Courses', cols: 4, rows: 2, tableData: allCourses }
          ];
        } else {
          return [
            { title: 'Users', cols: 1, rows: 4, tableData: allUsers },
            { title: 'Courses', cols: 1, rows: 4, tableData: allCourses },
            { title: 'Requests', cols: 2, rows: 2, tableData: this.requestReportService.getAllRequests() },
            { title: 'Reports', cols: 2, rows: 2, tableData: this.requestReportService.getAllReports() },
          ];
        }
      })
    );
  }
}

export interface TableData {
  username: string;
  description: string;
  content: any;
}

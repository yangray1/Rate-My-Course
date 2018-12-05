import { ReviewService } from "./../_services/review.service";
import { CoursesService } from "src/app/_services/courses.service";
import { Course } from "./../_services/courses.service";
import {
  RequestReportService,
  RequestReport
} from "./../_services/request-report.service";
import { UsersService } from "./../_services/users.service";
import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";
import { MatDialog, MatDialogRef } from "@angular/material";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { NewCourseDialogComponent } from "../user-dashboard/edit-courses/new-course-dialog/new-course-dialog.component";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  displayedColumns: string[] = ["username", "description"];
  cards: any;

  allCourses: TableData[] = [];

  allRequests: RequestReport[];
  allReports: RequestReport[];
  allUsers: TableData[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UsersService,
    private requestReportService: RequestReportService,
    private reviewService: ReviewService,
    private matDialog: MatDialog,
    private courseService: CoursesService
  ) {}

  ngOnInit() {
    this.allCourses = [];
    this.allRequests = [];
    this.allReports = [];
    this.allUsers = [];
    this.courseService.getAllCourses().subscribe((courses: Course[]) => {
      courses.forEach((course: Course) => {
        this.allCourses.push({
          username: course.courseCode,
          description: course.courseName,
          content: { type: "course", description: course }
        });
      });
      this.requestReportService.getAllReports().subscribe(reports => {
        console.log(reports);
        this.allReports = reports;
        this.requestReportService.getAllRequests().subscribe(requests => {
          this.allRequests = requests;
          this.userService.getAllUsers().subscribe(users => {
            users.forEach(user => {
              this.allUsers.push({
                username: user.username,
                description: user.firstName + " " + user.lastName,
                content: { type: "user", user: user }
              });
            });
            this.setCards();
          });
        });
      });
    });
  }

  // what happens when you click on that box.
  select(row: any) {
    let matDialogRef: MatDialogRef<any>;
    if (row.content.type === "user") {
      matDialogRef = this.matDialog.open(EditUserComponent, {
        data: row.content.user,
        width: "500px"
      });
      matDialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.userService.getAllUsers().subscribe(users => {
          this.allUsers = [];
          users.forEach(user => {
            this.allUsers.push({
              username: user.username,
              description: user.firstName + " " + user.lastName,
              content: { type: "user", user: user }
            });
          });
          this.setCards();
        });
      });
    } else if (row.content.type === "course") {
      this.matDialog
        .open(NewCourseDialogComponent, {
          data: { course: row.content.description, isAdmin: true },
          width: "500px"
        })
        .afterClosed()
        .subscribe(result => {
          this.courseService.getAllCourses().subscribe((courses: Course[]) => {
            this.allCourses = [];
            courses.forEach((course: Course) => {
              this.allCourses.push({
                username: course.courseCode,
                description: course.courseName,
                content: { type: "course", description: course }
              });
            });
            this.setCards();
          });
        });
    }
  }

  ban(username: string) {
    this.userService.banUser(username);
  }

  removeReview(review: any, report: any) {
    console.log(review);
    this.reviewService.deleteReview(review).subscribe(deletedReview => {
      console.log(deletedReview);
      this.ngOnInit();
    });
  }

  resolve(request: RequestReport) {
    console.log(request);
    request.resolved = true;
    this.requestReportService
      .saveRequestReport(request)
      .subscribe(savedRequestReport => {
        console.log(savedRequestReport);
      });
  }

  setCards() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          return [
            { title: "Users", cols: 4, rows: 2, tableData: this.allUsers },
            { title: "Courses", cols: 4, rows: 2, tableData: this.allCourses },
            {
              title: "Requests",
              cols: 4,
              rows: 2,
              tableData: this.allRequests
            },
            {
              title: "Reports",
              cols: 4,
              rows: 3,
              tableData: this.allReports
            }
          ];
        } else {
          return [
            { title: "Users", cols: 2, rows: 2, tableData: this.allUsers },
            { title: "Courses", cols: 2, rows: 2, tableData: this.allCourses },
            {
              title: "Requests",
              cols: 2,
              rows: 2,
              tableData: this.allRequests
            },
            {
              title: "Reports",
              cols: 2,
              rows: 2,
              tableData: this.allReports
            }
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

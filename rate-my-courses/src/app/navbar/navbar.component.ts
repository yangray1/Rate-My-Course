import { UsersService } from "src/app/_services/users.service";
import { ReviewService } from "./../_services/review.service";
import { MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { LoginService } from "../_services/login.service";
import { LoginComponent } from "../login/login.component";
import { CoursesService, Course } from "../_services/courses.service";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import { SuggestionDialogComponent } from "./suggestion-dialog/suggestion-dialog.component";
import { User } from "../_services/users.service";
import { NewReviewComponent } from "../new-review/new-review.component";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User;

  searchCourse: string;
  courses: string[];

  loginSubscription: Subscription;

  searchBarControl: FormControl = new FormControl();
  filteredCourses: Observable<string[]>;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private coursesService: CoursesService,
    private userService: UsersService
  ) {}

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.courses
      ? this.courses.filter(course => course.includes(filterValue))
      : [];
  }

  isLoggedIn() {
    return localStorage.getItem("username");
  }

  search() {
    this.router.navigate(["/view-reviews/" + this.searchCourse.toUpperCase()]);
  }

  // this is executed when the component is loaded up
  ngOnInit() {
    // Subscribe to the results
    // this.loginSubscription = this.loginService.loggedIn$.subscribe((validLogin: boolean) => {
    //   // Bind the given variable validLogin, to this.loggedIn
    //   this.loggedIn = validLogin;
    //   console.log(this.loggedIn);
    // });
    this.coursesService.getAllCourses().subscribe((allCourses: Course[]) => {
      this.courses = allCourses.map(course => course.courseCode);
    });
    this.filteredCourses = this.searchBarControl.valueChanges.pipe(
      startWith(""),
      map(value => this._filter(value))
    );

    if (localStorage.getItem("username")) {
      this.userService
        .getUserByUsername(localStorage.getItem("username"))
        .subscribe(res => {
          this.user = res;
        });
    }

    this.searchBarControl.valueChanges.subscribe(value => {
      this.searchCourse = value;
    });
    console.log(this.activatedRoute.pathFromRoot);
  }

  logout() {
    this.router.navigate(["/"]);
    localStorage.clear();
  }

  login() {
    const matDialogRef = this.matDialog
      .open(LoginComponent, { width: "500px" })
      .afterClosed()
      .subscribe(response => {
        if (localStorage.getItem("username")) {
          this.userService
            .getUserByUsername(localStorage.getItem("username"))
            .subscribe(res => {
              this.user = res;
              this.dashboard();
            });
          console.log(response);
        }
      });
  }

  dashboard() {
    if (localStorage.isAdmin === "true") {
      this.router.navigate(["/admin-dashboard"]);
    } else {
      this.router.navigate(["/user-dashboard/" + this.user.username]);
    }
  }

  goHome() {
    this.router.navigate(["/"]);
  }

  newReview() {
    const matDialogRef = this.matDialog.open(NewReviewComponent, {
      data: {
        isNew: true
      },
      width: "600px",
      height: "700px"
    });
  }

  suggestion() {
    this.matDialog.open(SuggestionDialogComponent, {
      width: "500px",
      data: { user: localStorage.user }
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}

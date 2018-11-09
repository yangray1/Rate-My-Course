import { ReviewService } from './../_services/review.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { LoginComponent } from '../login/login.component';
import { WriteReviewComponent } from '../write-review/write-review.component';
import { User } from '../_services/users.service';
import { CoursesService } from '../_services/courses.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { SuggestionDialogComponent } from './suggestion-dialog/suggestion-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  user: User;
  isAdmin: boolean;

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
  ) {
    this.loggedIn = false;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();
    return this.coursesService.getAllCourses().filter(course => course.includes(filterValue));
  }

  search() {
    this.router.navigate(['/view-reviews/' + this.searchCourse]);
  }

  // this is executed when the component is loaded up
  ngOnInit() {
    // Subscribe to the results
    this.loginSubscription = this.loginService.loggedIn$.subscribe((validLogin: boolean) => {
      // Bind the given variable validLogin, to this.loggedIn
      this.loggedIn = validLogin;
      console.log(this.loggedIn);
    });
    this.courses = this.coursesService.getAllCourses();
    this.filteredCourses = this.searchBarControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.searchBarControl.valueChanges.subscribe(value => {
      this.searchCourse = value;
    });
    console.log(this.activatedRoute.pathFromRoot);
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/']);
  }

  login() {
    const matDialogRef = this.matDialog.open(
      LoginComponent,
      { width: '500px' }
    ).afterClosed().subscribe(response => {
      this.user = response.user;
      this.isAdmin = response.user.isAdmin;
      this.dashboard();
      console.log(response);
    });
  }

  dashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/user-dashboard/' + this.user.username]);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  newReview() {
    const matDialogRef = this.matDialog.open(
      WriteReviewComponent,
      {
        width: '600px',
        height: '700px'
      }
    );
  }

  suggestion() {
    this.matDialog.open(
      SuggestionDialogComponent,
      {
        width: '500px',
        data: { user: this.user }
      }
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}

import { CoursesService } from 'src/app/_services/courses.service';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material';
import { UsersService, User } from './../_services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { ReviewService, Review } from '../_services/review.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards: any;
  user: User;
  userReviews: Review[];

  editing = false;
  origReview: Review;

  title = [
    'title', 'data'
  ];

  courseDescMap: Object = {};

  userSessionSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private matDialog: MatDialog,
    private router: Router,
    public courseService: CoursesService
  ) {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(res => {
        this.user = res;
        this.userReviews = this.reviewService.getReviewsByUser(this.user.username);
        console.log(this.userReviews);
        console.log(this.user);
        this.setCards();
      });
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserByUsername(localStorage.getItem('username')).subscribe(res => {
        this.user = res;
        this.user.courses.forEach(course => {
          this.courseService.getCourse(course).subscribe(courseObj => {
            this.courseDescMap[course] = courseObj.courseDesc.substring(0, 25) + "..";
          });
          this.user.takenCourses.forEach(course => {
            this.courseService.getCourse(course).subscribe(courseObj => {
              this.courseDescMap[course] = courseObj.courseDesc.substring(0, 25) + "..";
            });
          });
          this.userReviews = this.reviewService.getReviewsByUser(this.user.username);
          this.setCards();
        });
      });
    });
  }

  setCards() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {

        const userData = [
          { title: 'Username', data: this.user.username },
          { title: 'Year', data: this.user.yearOfStudy },
          { title: 'Banned', data: this.user.banned ? 'Yes' : 'No' },
        ];

        if (matches) {
          return [
            { title: 'User Info', cols: 4, rows: 1, cardData: { user: this.user, tableData: userData } },
            { title: 'Courses', cols: 4, rows: 2, cardData: { currentlyTaking: this.user.courses, taken: this.user.takenCourses } },
            { title: 'All Reviews', cols: 4, rows: 3, cardData: { allReviews: this.userReviews } },
          ];
        }

        return [
          { title: 'User Info', cols: 1, rows: 1, cardData: { user: this.user, tableData: userData } },
          { title: 'All Reviews', cols: 3, rows: 3, cardData: { allReviews: this.userReviews } },
          { title: 'Courses', cols: 1, rows: 2, cardData: { currentlyTaking: this.user.courses, taken: this.user.takenCourses } },
        ];
      })
    );
  }

  edit(section: string) {
    if (section === 'User Info') {
      this.matDialog.open(
        EditProfileComponent,
        {
          data: this.user,
          width: '500px'
        }
      );
    } else if (section === 'Courses') {
      this.matDialog.open(
        EditCoursesComponent,
        {
          data: this.user,
          width: '500px'
        }
      );
    }
    console.log(section);
  }

  editReview(review: Review) {
    this.editing = true;
    this.origReview = review;
  }

  saveReview(review: Review) {
    this.reviewService.saveReview(review, this.origReview);
    this.editing = false;
  }

  cancelChange(review: Review) {
    this.editing = false;
  }

  removeReview(review: Review) {
    console.log(review);
    this.reviewService.deleteReview(review);
    this.ngOnInit();
    this.editing = false;
  }

  reset() {
    this.editing = false;
  }

  viewCourse(course: string) {
    this.router.navigate(['/view-reviews/' + course]);
  }

  getCourseDescription(course: string) {
    
  }
}

import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from './../register/register.component';
import { LoginService } from './../_services/login.service';
import { UsersService } from './../_services/users.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.scss']
})
export class WriteReviewComponent implements OnInit {
  
  reviewForm = this.fb.group({
    overallRating: [null, Validators.required],
    levelOfDifficulty: [null, Validators.required],
    workload: [null, Validators.required],
    hoursPerWeek: [null, Validators.required],
    textbookUsed: [null, Validators.required],
    grade: [null, Validators.required],
    major: [null, Validators.required],
    comments: [null, Validators.required],
    termsOfService: [null, Validators.requiredTrue],
  });

  grades: Grade[] = [
    {grade: 'A+', gradeValue: 'A+'},
    {grade: 'A', gradeValue: 'A'},
    {grade: 'A-', gradeValue: 'A-'},
    {grade: 'B+', gradeValue: 'B+'},
    {grade: 'B', gradeValue: 'B'},
    {grade: 'B-', gradeValue: 'B-'},
    {grade: 'C+', gradeValue: 'C+'},
    {grade: 'C', gradeValue: 'C'},
    {grade: 'C-', gradeValue: 'C-'},
    {grade: 'D+', gradeValue: 'D+'},
    {grade: 'D', gradeValue: 'D'},
    {grade: 'D-', gradeValue: 'D-'},
    {grade: 'F', gradeValue: 'F'}
  ];
  constructor(private fb: FormBuilder,
    private userService: UsersService,
    private loginService: LoginService,
    private registerDialog: MatDialog,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(){
    // const result = this.userService.verifyLogin(
    //   this.reviewForm.controls.overallRating.value,
    //   this.reviewForm.controls.levelOfDifficulty.value,
    //   this.reviewForm.controls.workload.value,
    //   this.reviewForm.controls.hoursPerWeek.value,
    //   this.reviewForm.controls.textbookUsed.value,
    //   this.reviewForm.controls.grade.value,
    //   this.reviewForm.controls.major.value,
    //   this.reviewForm.controls.comments.value,
    //   this.reviewForm.controls.termsOfService.value);
      
    if (result.valid) {
      this.loginService.login(true);

      if (result.isAdmin) {
        // Go to admin-dashboard component
        this.router.navigate(
          ['../admin-dashboard'],
          { relativeTo: this.activeRoute }
        );
      } else {

        // Go to user-dashboard component
        this.router.navigate(
          ['../user-dashboard'],
          { relativeTo: this.activeRoute }
        );
      }
    } else {
      this.loginService.login(false); //makes the red font when fail.
      alert('username and password INVALID');
    }
    console.log(result);

  }
}
export interface Grade {
  grade: string;
  gradeValue: string;
}
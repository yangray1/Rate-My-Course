import { ReviewService } from './../../_services/review.service';
import { RequestReportService } from './../../_services/request-report.service';
import { UsersService } from './../../_services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-respond-report',
  templateUrl: './respond-report.component.html',
  styleUrls: ['./respond-report.component.scss']
})
export class RespondReportComponent implements OnInit {



  constructor(
    public userService: UsersService,
    public requestReportService: RequestReportService,
    public reviewService: ReviewService,
    public dialogRef: MatDialogRef<RespondReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    console.log(data);
  }

  ngOnInit() {
  }

  deleteReview() {
    this.reviewService.deleteReview(this.data.review);
  }

  ban() {
    this.userService.banUser(this.data.reported);
  }

}

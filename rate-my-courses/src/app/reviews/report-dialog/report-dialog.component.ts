import { RequestReportService } from './../../_services/request-report.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditUserComponent } from 'src/app/admin-dashboard/edit-user/edit-user.component';
import { FormBuilder } from '@angular/forms';
import { Review } from 'src/app/_services/review.service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  reportForm = this.fb.group({
    description: null,
    report: null
  });

  currentReview: Review;

  constructor(
    private fb: FormBuilder,
    private reportService: RequestReportService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.currentReview = this.data.review;
  }

  onSubmit() {
    this.reportService.saveReport({
      username: 'yangray1',
      description: this.reportForm.controls['description'].value,
      content: {
        type: 'report',
        report: this.reportForm.controls['report'].value,
        review: this.currentReview
      }
    });
  }

}

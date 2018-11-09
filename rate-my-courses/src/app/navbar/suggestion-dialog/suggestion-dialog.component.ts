import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RequestReportService } from 'src/app/_services/request-report.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditUserComponent } from 'src/app/admin-dashboard/edit-user/edit-user.component';
import { User } from 'src/app/_services/users.service';

@Component({
  selector: 'app-suggestion-dialog',
  templateUrl: './suggestion-dialog.component.html',
  styleUrls: ['./suggestion-dialog.component.scss']
})
export class SuggestionDialogComponent implements OnInit {

  user: User;

  suggestionForm = this.fb.group({
    description: null,
    request: null
  });

  constructor(
    private fb: FormBuilder,
    private reportService: RequestReportService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit() {
    this.user = this.data.user;
  }

  onSubmit() {
    this.reportService.saveReport({
      username: this.user.username,
      description: this.suggestionForm.controls['description'].value,
      content: {
        type: 'request',
        request: this.suggestionForm.controls['request'].value,
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.scss']
})
export class ReportUserComponent implements OnInit {

  submitted = false;
  reportForm = this.fb.group({
    spreadFalseInfo: [null],
    spamming: [null],
    inappropriateContent: [null],
    comments: [null],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(){
    // Put data into database.
    alert("Thank you for your report.")
    this.router.navigate(
      ['../user-dashboard'],
      { relativeTo: this.activeRoute }
    );
  }
  
  onCancel(){
    this.router.navigate(
      ['../user-dashboard'],
      { relativeTo: this.activeRoute }
    );
  }

}

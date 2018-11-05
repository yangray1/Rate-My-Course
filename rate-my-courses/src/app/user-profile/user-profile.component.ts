import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  changeInfoForm = this.fb.group({
    displayName: [null, Validators.required],
    oldPassword: [null, Validators.required],
    newPassword: [null, Validators.required],
  });

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  onSave(){
    if (this.changeInfoForm.invalid){
      alert("Invalid fields. Please fill in all the required fields.");
      return;
    }
    alert("Information suceesfully changed!")
    this.router.navigate(
      ['../user-dashboard'],
      { relativeTo: this.activeRoute }
    );
  }
}

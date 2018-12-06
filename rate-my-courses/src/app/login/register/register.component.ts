import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatDialogRef, MatDialog } from '@angular/material';
import { UsersService, User } from 'src/app/_services/users.service';

@Component({
  selector: 'app-username-taken-dialog-component',
  template: `
<div mat-dialog-content>
  Username already taken, please try something different!
</div>
  `
})
export class UsernameTakenComponent {  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  addressForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    username: [null, Validators.required],
    yearOfStudy: [null, Validators.required],
    password: [null, Validators.required],
    reenterPassword: [null, Validators.required],
  });

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  programs: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private registerDialogRef: MatDialogRef<RegisterComponent>,
    private userTakenRef: MatDialog
  ) { }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.programs.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(program: any) {
    const index = this.programs.indexOf(program);

    if (index >= 0) {
      this.programs.splice(index, 1);
    }
  }

  register() {
    this.userService.addNewUser({
      firstName: this.addressForm.controls.firstName.value,
      lastName: this.addressForm.controls.lastName.value,
      username: this.addressForm.controls.username.value,
      yearOfStudy: this.addressForm.controls.yearOfStudy.value,
      programOfStudy: this.programs,
      courses: [],
      takenCourses: [],
      password: this.addressForm.controls.password.value,
      isAdmin: false,
      banned: false
    }).subscribe((newUser: any) => {
      console.log(newUser);
      if (newUser.message) {
        this.userTakenRef.open(UsernameTakenComponent);
      } else {
        this.registerDialogRef.close();
      }
    });
    console.log(this.addressForm);
  }
}

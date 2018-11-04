import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent, MatDialogRef } from '@angular/material';
import { User } from '../_model/user';
import { UsersService } from '../_services/users.service';

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
    private registerDialogRef: MatDialogRef<RegisterComponent>
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
    this.userService.addNewUser(new User(
      this.addressForm.controls.firstName.value,
      this.addressForm.controls.lastName.value,
      this.addressForm.controls.username.value,
      this.addressForm.controls.yearOfStudy.value,
      this.programs,
      this.addressForm.controls.password.value
    ));
    console.log(this.addressForm);
    this.registerDialogRef.close();
  }
}

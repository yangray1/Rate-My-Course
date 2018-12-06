import { Component, Inject } from "@angular/core";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import { UsersService, User } from "src/app/_services/users.service";
import {
  MatDialogRef,
  MatChipInputEvent,
  MAT_DIALOG_DATA
} from "@angular/material";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"]
})
export class EditUserComponent {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  user: User;
  origUser: User;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  editUserForm = this.fb.group({
    firstName: null,
    lastName: null,
    yearOfStudy: null,
    programOfStudy: null,
    courses: null,
    takenCourses: null,
    banned: null
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data;
    this.editUserForm.controls["firstName"].setValue(this.user.firstName);
    this.editUserForm.controls["lastName"].setValue(this.user.lastName);
    this.editUserForm.controls["yearOfStudy"].setValue(this.user.yearOfStudy);
    this.editUserForm.controls["programOfStudy"].setValue(
      this.user.programOfStudy
    );
    this.editUserForm.controls["courses"].setValue(this.user.courses);
    this.editUserForm.controls["takenCourses"].setValue(this.user.takenCourses);
    this.dialogRef.backdropClick().subscribe(event => {
      console.log(event);
      this.user = this.origUser;
      this.dialogRef.close(false);
    });
  }

  add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.user.programOfStudy.push(value.trim());
    }

    if (input) {
      input.value = "";
    }
  }

  remove(program: any) {
    const index = this.user.programOfStudy.indexOf(program);

    if (index >= 0) {
      this.user.programOfStudy.splice(index, 1);
    }
  }

  save() {
    console.log(this.user);
    this.user.firstName = this.editUserForm.controls["firstName"].value;
    this.user.lastName = this.editUserForm.controls["lastName"].value;
    this.user.yearOfStudy = this.editUserForm.controls["yearOfStudy"].value;
    this.user.programOfStudy = this.editUserForm.controls["programOfStudy"].value;
    this.user.courses = this.editUserForm.controls["courses"].value;
    this.user.takenCourses = this.editUserForm.controls["takenCourses"].value;
    this.user.banned = this.editUserForm.controls["banned"].value;
    this.userService.saveUser(this.user).subscribe(savedUser => {
      console.log(savedUser);
      this.dialogRef.close(true);
    });
  }
}

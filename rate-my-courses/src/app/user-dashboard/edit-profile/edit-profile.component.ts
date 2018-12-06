import { Component, OnInit, Inject } from "@angular/core";
import { User, UsersService } from "src/app/_services/users.service";
import { ENTER, COMMA } from "@angular/cdk/keycodes";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatChipInputEvent
} from "@angular/material";
import { EditUserComponent } from "src/app/admin-dashboard/edit-user/edit-user.component";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"]
})
export class EditProfileComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  user: User;
  origUsername: string;
  editUserForm = this.fb.group({
    firstName: null,
    lastName: null,
    yearOfStudy: null,
    programOfStudy: null,
    courses: null,
    takenCourses: null
  });
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
    this.user = data;
    this.origUsername = this.user.username;
    this.editUserForm.controls["firstName"].setValue(this.user.firstName);
    this.editUserForm.controls["lastName"].setValue(this.user.lastName);
    this.editUserForm.controls["yearOfStudy"].setValue(this.user.yearOfStudy);
    this.editUserForm.controls["programOfStudy"].setValue(
      this.user.programOfStudy
    );
    this.editUserForm.controls["courses"].setValue(this.user.courses);
    this.editUserForm.controls["takenCourses"].setValue(this.user.takenCourses);
  }

  ngOnInit() {}

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
    this.user.firstName = this.editUserForm.controls["firstName"].value;
    this.user.lastName = this.editUserForm.controls["lastName"].value;
    this.user.yearOfStudy = this.editUserForm.controls["yearOfStudy"].value;
    this.user.programOfStudy = this.editUserForm.controls[
      "programOfStudy"
    ].value;
    this.user.courses = this.editUserForm.controls["courses"].value;
    this.user.takenCourses = this.editUserForm.controls["takenCourses"].value;
    console.log(this.user);
    this.userService.saveUser(this.user).subscribe(savedUser => {
      console.log(savedUser);
      this.dialogRef.close();
    });
  }
}

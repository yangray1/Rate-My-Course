import { LoginService } from './../_services/login.service';
import { UsersService } from './../_services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from '../admin-dashboard/edit-user/edit-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  addressForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private loginService: LoginService,
    private registerDialog: MatDialog,
    public dialogRef: MatDialogRef<EditUserComponent>,
  ) { }

  onSubmit() {
    const result = this.userService.verifyLogin(
      this.addressForm.controls.username.value,
      this.addressForm.controls.password.value);
    this.loginService.login(result.valid);
    if (result.valid) {
      this.loginService.inSession(result.foundUser);
      this.dialogRef.close({ user: result.foundUser });
    }
    console.log(result);
  }

  register() {
    const registerDialogRef = this.registerDialog.open(RegisterComponent, {
      width: '500px',
    });
    registerDialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}

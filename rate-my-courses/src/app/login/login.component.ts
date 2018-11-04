import { RegisterComponent } from './../register/register.component';
import { LoginService } from './../_services/login.service';
import { UsersService } from './../_services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

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
    private router: Router,
    private activeRoute: ActivatedRoute) { }

  onSubmit() {
    const result = this.userService.verifyLogin(
      this.addressForm.controls.username.value,
      this.addressForm.controls.password.value);
    if (result.valid) {
      this.loginService.login(true);
      if (result.isAdmin) {
        this.router.navigate(
          ['../admin-dashboard'],
          { relativeTo: this.activeRoute }
        );
      } else {
        this.router.navigate(
          ['../user-dashboard'],
          { relativeTo: this.activeRoute }
        );
      }
    } else {
      this.loginService.login(false);
      alert('username and password INVALID');
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

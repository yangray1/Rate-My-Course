import { UsersService } from './../_services/users.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute) { }

  onSubmit() {
    const result = this.userService.verifyLogin(
      this.addressForm.controls.username.value,
      this.addressForm.controls.password.value);
    if (result.valid) {
      if (result.isAdmin) {
        this.router.navigate(
          ['../admin-dashboard'],
          { relativeTo: this.route }
        );
      } else {
        this.router.navigate(
          ['../user-dashboard'],
          { relativeTo: this.route }
        );
      }
    } else {
      alert('username and password INVALID');
    }
    console.log(result);
  }
}

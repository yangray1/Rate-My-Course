import { User } from 'src/app/_model/user';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../_services/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  isAdmin: boolean;

  loginSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    this.loggedIn = false;
  }

  // this is executed when the component is loaded up
  ngOnInit() {
    // Subscribe to the results
    this.loginSubscription = this.loginService.loggedIn$.subscribe((validLogin: boolean) => {

      // Bind the given variable validLogin, to this.loggedIn
      this.loggedIn = validLogin;
      console.log('change');
    });
  }

  logout() {
    this.loggedIn = false;
  }

  login() {
    const matDialogRef = this.matDialog.open(
      LoginComponent,
      { width: '500px' }
    ).afterClosed().subscribe(response => {
      this.isAdmin = response.user.isAdmin;
      console.log(response);
    });
  }

  dashboard() {
    if (this.isAdmin) {
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.router.navigate(['/']); // TODO: ADD ROUTE TO USER DASHBOARD HERE
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}

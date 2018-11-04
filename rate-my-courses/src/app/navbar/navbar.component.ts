import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn: boolean;
  loginSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private activeRoute: ActivatedRoute) {
    this.loggedIn = false;
  }

  ngOnInit() {
    this.loginSubscription = this.loginService.loggedIn$.subscribe((validLogin: boolean) => {
      this.loggedIn = validLogin;
      console.log('change');
    });
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(
      ['../login'],
      { relativeTo: this.activeRoute }
    );
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }
}

import { User } from './../_model/user';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSource = new Subject<boolean>();
  private userLoggedInSource = new Subject<User>();

  loggedIn$ = this.loggedInSource.asObservable();
  userLoggedIn$ = this.userLoggedInSource.asObservable();

  login(confirm: boolean) {
    this.loggedInSource.next(confirm);
  }

  inSession(user: User) {
    console.log(user);
    this.userLoggedInSource.next(user);
  }
}

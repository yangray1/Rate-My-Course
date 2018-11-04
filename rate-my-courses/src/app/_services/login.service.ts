import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.asObservable();

  login(confirm: boolean) {
    this.loggedInSource.next(confirm);
  }
}

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from './users.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private API = 'https://rate-my-courses.herokuapp.com';
  private API = 'http://localhost:3000'
  private LOGIN_API = this.API + '/api/login';

  constructor(private http: HttpClient) {  }

  login(username: string, password: string): Observable<any> {
    console.log(username, password);
    return this.http.post<any>(this.LOGIN_API, {
        username: username,
        password: password
      });
  }
}

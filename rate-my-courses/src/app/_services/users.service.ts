import { User } from './users.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [
    {
      firstName: 'Raymond',
      lastName: 'Yang',
      username: 'yangray1',
      yearOfStudy: 3,
      programOfStudy: [
        'Computer Science',
        'Statistics',
        'HPS'
      ],
      courses: ['CSC309', 'CSC301', 'CSC369'],
      takenCourses: ['CSC209', 'CSC207', 'CSC236', 'CSC258'],
      password: 'password1234',
      isAdmin: false,
      banned: false
    },
    {
      firstName: 'Ad',
      lastName: 'Min',
      username: 'admin1',
      yearOfStudy: 3,
      programOfStudy: [
        'Computer Science',
        'Statistics'
      ],
      courses: [

      ],
      takenCourses: [],
      password: 'admin123',
      isAdmin: true,
      banned: false
    },
  ];

  // private API = 'https://rate-my-courses.herokuapp.com';
  private API = 'http://localhost:3000'
  private USER_API = this.API + '/api/users';

  constructor(private http: HttpClient) { }

  public verifyLogin(username: string, password: string): any {
    const foundUser = this.users.filter(user => user.username === username);
    if (foundUser.length > 0 && foundUser[0].password === password) {
      return { valid: true, foundUser: foundUser[0] };
    } else {
      return { valid: false };
    }
  }

  public addNewUser(newUser: User) {
    this.users.push(newUser);
  }

  public getUserByUsername(username: string): Observable<User> {
    console.log(this.getHttpHeaders());
    return this.http.get<User>(this.USER_API + '/profile/' + username, this.getHttpHeaders());
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public saveUser(user: User, origUsername: string) {
    const index = this.users.map(function (e) { return e.username; }).indexOf(origUsername);
    if (index >= 0) {
      this.users.splice(index, 1);
      this.users.push(user);
    }
  }

  public banUser(userName: string) {
    const user: User = this.users.filter(e => e.username === userName)[0];
    user.banned = true;
    this.saveUser(user, userName);
  }

  private getHttpHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwtToken') || ''
      })
    };
  }
}

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  yearOfStudy: number;
  programOfStudy: string[];
  courses: string[];
  takenCourses: string[];
  password: string;
  isAdmin: boolean;
  banned: boolean;
}

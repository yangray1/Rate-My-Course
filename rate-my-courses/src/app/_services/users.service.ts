import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { User } from '../_model/user';

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
      password: 'admin123',
      isAdmin: true,
      banned: false
    },
  ];

  constructor() { }

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

  public getAllUsers(): User[] {
    return this.users;
  }

  public saveUser(user: User, origUsername: string) {
    const index = this.users.map(function(e) { return e.username; }).indexOf(origUsername);
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
}

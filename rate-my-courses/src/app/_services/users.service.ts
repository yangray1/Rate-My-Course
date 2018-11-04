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
      isAdmin: false
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
      isAdmin: true
    },
  ];

  constructor() { }

  public verifyLogin(username: string, password: string): any {
    const foundUser = this.users.filter(user => user.username === username);
    if (foundUser.length > 0 && foundUser[0].password === password) {
      return { valid: true, isAdmin: foundUser[0].isAdmin };
    } else {
      return { valid: false };
    }
  }
}

import { Injectable } from '@angular/core';
import { User } from '../assignments/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn = false;
  user : User;
  // Dans la vraie vie (dans le projet à faire), on
  // passerait login et password.
  logIn() {
    this.loggedIn = true;
    console.log( this.loggedIn)
   
  }

  logOut() {
    this.loggedIn = false;
    console.log( this.loggedIn)
   
  }

  isAdmin():Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
  }

  

  constructor() {
    this.user = new User();
  }
}

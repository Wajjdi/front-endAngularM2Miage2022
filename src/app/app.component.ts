import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion des assignments';
  etat = false;
  constructor(private authService:AuthService) {}

  


  login() {
    console.log()
    if(!this.authService.loggedIn) {
      this.authService.logIn();
      this.authService.isAdmin().then((value:boolean)=>{console.log(value)
      this.etat = value;
      })
    } else {
      this.authService.logOut();
      this.authService.isAdmin().then((value:boolean)=>{console.log(value)
      this.etat = value;
    })
    }
  }
}

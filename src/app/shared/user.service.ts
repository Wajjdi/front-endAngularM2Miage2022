import { Injectable, ɵɵNgOnChangesFeature } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../assignments/user.model';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:User[] = [
    {
      mail:"wajdi.gaiech@gmail.com",
      motDePasse: '1234',
    },
    
  ]
  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  uri = "https://api2-cours-angular2022.herokuapp.com/api/user";

  getUsers():Observable<User[]> {
    //return of(this.assignments);
    return this.http.get<User[]>(this.uri);
  }

  

 
}

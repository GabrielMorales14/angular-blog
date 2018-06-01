import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private url: string = 'https://jsonplaceholder.typicode.com/users/';
  constructor(private http: Http) { }

  login(post): Observable<any> {
    this.http
    const getLoginUrl = this.url + '?email='+post['email'];
    return this.http
      .get(getLoginUrl, {})
      .pipe(
        map(
        res => {
          if (res.text() != '[]') {
            localStorage.setItem('currentUser', JSON.stringify(res.json()[0]));
          }
          return {error: 'email not found'};
        },
        err => {
          return err;
        }
        )
      )      
  }

  logout() {
    localStorage.removeItem('currentUser');
  }  
}

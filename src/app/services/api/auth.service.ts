
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import {environment} from '../../../environments/environment';

/*
interface myData {
  success: boolean;
  message: string;
}
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = environment.api_url + `api/login`;



  constructor(private http: Http,
              private _router: Router) { }


  loginUser(user) {
    return this.http.post(this._loginUrl, user);
  }

  logoutUser() {



    localStorage.removeItem('token');
    this._router.navigate(['']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

}



import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
/*import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/Rx';*/
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(
    private http: Http,
    private router: Router
  ) { }


/*
  signin(user){
    let headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
    return this.http.post('http://moneyapp.loc/api/user/signin',
      {email: user.email, password: user.password},
      {headers: headers})
      .map(res => {
        let token = res.json();
        return token;
      })
      .do(token => {
        localStorage.setItem('token', token.token);
        this.router.navigate(['home']);
      })
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  isAuthed() {
    const token = localStorage.getItem('token');
    return tokenNotExpired();
  }

  getUsers() {
    return this.http.get('http://moneyapp.loc/api/users')
      .map(res => {
        return res.json().users;
      });
  }

  getUser(id) {
    return this.http.get('http://moneyapp.loc/api/users/' + id)
      .map(res => {
        return res.json().user;
      });
  }

  getCurrent() {
    const token = localStorage.getItem('token');
    return this.http.get('http://moneyapp.loc/api/user/current?token=' + token)
      .map(res => {
        return res.json().user;
      });
  }



  updateUser(user) {
    return this.http.put('http://moneyapp.loc/api/user/' + user.id, user)
      .map(res => {
        return res.json().user;
      });
  }
  */


}

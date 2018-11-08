import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor (private authservice: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authservice.loggedIn()) {
      console.log('true');
      return true;
    } else {
      console.log('false, please authenticate!');
      this.router.navigate(['']);
      return false;
    }
  }
}

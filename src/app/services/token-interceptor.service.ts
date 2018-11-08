import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './api/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}

  intercept(req, next) {

let auth = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
     setHeaders:
       {
         Authorization: `Bearer ${auth.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }

}


/*
import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AuthService} from './api/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private authservice: AuthService){}

  intercept(req, next) {


    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' this.authservice.getToken())
      }
    );
    return next.handle(tokenizedReq);
  }

}

 */

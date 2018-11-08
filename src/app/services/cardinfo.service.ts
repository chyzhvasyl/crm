import { Injectable } from '@angular/core';


import {HttpClient, HttpParams} from '@angular/common/http';
import {CardInfo} from '../components/secure/patient-card/card-info';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardinfoService {
  private url = 'http://localhost:3000/data';
  constructor(private http: HttpClient) { }

/*
  // ресты для отправки на бек
  getUsers() {
    return this.http.get(this.url);
  }

  createUser(user: CardInfo) {
    return this.http.post(this.url, user);
  }
  updateUser(id: number, user: CardInfo) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.put(this.url, user, { params: urlParams});
  }

  удаление перенесем в кабинет пациєнта
  deleteUser(id: number) {
    const urlParams = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url, { params: urlParams});
  }
*/

}

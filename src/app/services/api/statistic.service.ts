import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {


  constructor( private http: Http) { }
 //  GetGraph(id) {
 //   return this.http.get<any>(`http://localhost:8090/api/session/${id}`)
 //     .toPromise()
 //     .then(data => {  return data; });
 // }


      GetGraph(id, body_graph) {
        return this.http.post(environment.api_url + `api/session/${id}`, new RequestOptions({
          params: id,
         body: body_graph
        }))
          .pipe(map(response => response.json()));
      }
}

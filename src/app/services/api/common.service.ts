import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions } from '@angular/http';
import {environment} from '../../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: Http) { }
  AddPatient(id, user) {
    return this.http.post(environment.api_url + `api/addpatient/${id}`, user)
      .pipe(map((response: Response) => response.json()));
  }

  EditPatient(user, id) {
    return this.http.put(environment.api_url + `api/update_patient/${id}`, user)
      .pipe(map((response: Response) => response.json()));
  }

  GetDoctors() {
    return this.http.get(environment.api_url + `:8090/api/doctor`)
      .pipe(map((response: Response) => response.json()));
  }

  GetPatients() {
    return this.http.get(environment.api_url + `api/patient`)
      .pipe(map((response: Response) => response.json()));
  }


  GetPatient() {
    return this.http.get(environment.api_url + `patient/:id`)
      .pipe(map((response: Response) => response.json()));
  }

  DeletePatient(body_id) {
    return this.http.delete(environment.api_url + `api/delete_patient`, new RequestOptions({
      body: body_id
    }))
      .pipe(map((response: Response) => response.json()));
  }

}

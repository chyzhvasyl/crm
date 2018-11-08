import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Patients} from '../components/secure/doctor-office/table';
import {Headers, RequestOptions} from '@angular/http';
import {map} from 'rxjs/operators';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DoctorDataService {

  constructor(private http: HttpClient, private http2: Http) {   }
  /* from local mongo*/
  getPatients(id) {
    return this.http.get<any>( environment.api_url + `api/personal/${id}`)
      .toPromise()
      .then(data => {return data; });

  }


  getPatient(id) {
    return this.http.get<any>(environment.api_url + `api/patient/${id}`)
      .toPromise()

      .then(data => {  return data; });
  }

upload(id, event) {
  const fileList: FileList = event.target.files;
  if (fileList.length > 0) {
    const file: File = fileList[0];
    const formData = new FormData();
    formData.append('graph', file, file.name);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions( {headers: headers });
    return this.http2.post(environment.api_url +  `api/patient_upload/${id}`, formData /*, options */)
      .pipe(map((res: Response ) => res.json()));
  }
}



  /* from json web server*/

  /*getPatients() {
    return this.http.get<any>('http://localhost:3000/data')
      .toPromise()
      .then(data => { return data; });
  }

  getPatient(id) {
    return this.http.get<any>(`http://localhost:3000/data/${id}`)
      .toPromise()

      .then(data => { return data; });
  }
*/

}

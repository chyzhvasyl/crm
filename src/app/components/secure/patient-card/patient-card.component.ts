import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DoctorDataService} from '../../../services/doctor-data.service';
import {Patients} from '../doctor-office/table';
import {Location} from '@angular/common';
import {MessageService} from 'primeng/api';
import {CommonService} from '../../../services/api/common.service';
import {Http} from '@angular/http';
import {Observable} from 'rxjs';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { map } from 'rxjs/operators';
import { Headers } from '@angular/http';
import {AuthService} from '../../../services/api/auth.service';
import {TranslatingService} from '../../../services/translate.service';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css'],
  providers: [MessageService]
})
export class PatientCardComponent implements OnInit {
  id: string;
  patient: any;
  edit_patient: Patients[] = [];
  displayDialog: boolean;
  client: Patients = {};
  newPatient: boolean;
  form: any = {};
  files: any;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
              private patientService: DoctorDataService,
              private _location: Location,
              private messageService: MessageService,
              private common: CommonService,
              private http: Http,
              public auth: AuthService,
              private translate: TranslatingService,
              private router: Router
  ) {
    this.form = {
      name: {}
    };
  }

  switchLanguage(string) {
    this.translate.language = string;
    this.translate.switchLanguage(this.translate.language);
  }

  ngOnInit() {
    // маршрутизация  либо так
    // this.id = this.route.snapshot.params['id'];
    // либо
    this.subscription = this.route.params.subscribe(params => this.id = params['id']);

    this.patientService
      .getPatient(this.id)
      .then(respone => {
        this.patient = respone;

      },
        err => {

          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 ) {
              this.router.navigate(['']);
            }
          }


        }

      );
  }

  backClicked() {
    this._location.back();
  }
  showDialogToAdd() {
    this.newPatient = true;
    this.client = {};
    this.displayDialog = true;
  }

  save() {
    let patient = this.patient;
    let edit = this.edit_patient;


    this.common.EditPatient(this.patient, this.id)
      .subscribe(
        res => {
          edit.unshift(res);
        },
        err => console.log(err)
      );
    this.patient = patient;
    console.log(this.patient);
    this.displayDialog = false;
    this.messageService.add({severity: 'success', summary: 'Accepted ', detail: 'Successfully changed '});

  }

  edit(event) {
    this.newPatient = false;
    this.client = this.clonePatient(event.data);
    this.displayDialog = true;
  }

  clonePatient(c: Patients): Patients {
    const car = {};
    for (const prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }
  addPhoto(event) {
    let target = event.target || event.srcElement;
    this.files = target.files;
  }
  fileChange(event, id) {
    id = this.id;
  this.patientService.upload(id, event)
    .subscribe(
      data => {
        console.log('success' + data);
        this.messageService.add({severity:'success', summary: 'Success', detail: 'File uploaded'});
        },
      error => {
        if (error)
        {
          this.messageService.add({severity: 'error', summary: 'Error', detail: 'Duplicate or incorrect data'});
        }
      }
    );
  }
}

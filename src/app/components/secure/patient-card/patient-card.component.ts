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
import {environment} from '../../../../environments/environment';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from "../doctor-office/selectitem";
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
  sex: SelectItem[] = [];
  visibility =  false;
  editing:string = 'Editing';
  savePatient = 'Save';
  arrow = environment.vertical_align_bottom;
  editingForm: FormGroup;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
              private patientService: DoctorDataService,
              private _location: Location,
              private messageService: MessageService,
              private common: CommonService,
              private http: Http,
              public auth: AuthService,
              private translate: TranslatingService,
              private router: Router,
              private fb: FormBuilder
  ) {
    this.form = {
      name: {}
    };
    this.sex = [];
    this.sex.push({label: 'Select Gender', value: ''});
    this.sex.push({label: 'Male', value: 'Male'});
    this.sex.push({label: 'Female', value: 'Female'});

    if (this.translate.language === 'en'){
      this.editing = 'Editing';

    }
    else{
      this.editing = 'Редактирование';
      this.savePatient = 'Сохранить';
    }
  }

  switchLanguage(string) {
    this.translate.language = string;
    this.translate.switchLanguage(this.translate.language);
    if (this.translate.language === 'en'){
      this.editing = 'Editing';
      this.savePatient = 'Сохранить';
      this.savePatient = 'Save';
    }
    else{
      this.editing = 'Редактирование';
      this.savePatient = 'Сохранить';
    }
  }

  ngOnInit() {
    console.log('this.translate.language', this.translate.language);
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


    this.editingForm = this.fb.group(
      {
        'fullname': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(70)])),
        'desease': new FormControl('', Validators.compose([Validators.minLength(1), Validators.maxLength(50)])),
        'date_in': new FormControl('',),
        'date_out': new FormControl(''),
        'status': new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])),
        'birthdate': new FormControl('', Validators.required),
        'sex': new FormControl('', Validators.required),
        'description': new FormControl('', Validators.maxLength(6000)),

      });

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
  moreText(){
    this.visibility=!this.visibility;
    if(!this.visibility){
      this.arrow = environment.vertical_align_bottom
    }
    else {
      this.arrow = environment.vertical_align_top
    }
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

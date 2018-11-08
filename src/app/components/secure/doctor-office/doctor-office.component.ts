import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SortEvent} from './sort-event';
import {Router} from '@angular/router';
import { DoctorDataService } from '../../../services/doctor-data.service';
import {MessageService} from 'primeng/api';
import {MessageServiceService} from '../../../services/message-service.service';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from './selectitem';
import {Patients} from './table';
import {CommonService} from '../../../services/api/common.service';
import {AuthService} from '../../../services/api/auth.service';
import {HostListener} from '@angular/core';
import {LazyLoadEvent} from './lazy-load-event';
import * as _ from 'underscore';
import {TranslatingService} from '../../../services/translate.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-doctor-office',
  templateUrl: './doctor-office.component.html',
  styleUrls: ['./doctor-office.component.css'],
  providers: [MessageService, MessageServiceService, ConfirmationService]
})

export class DoctorOfficeComponent implements OnInit {

  /* validation for saving patient  */
  //@Input() sortFunction: EventEmitter<any> = new EventEmitter();
  //@Input() onLazyLoad: EventEmitter<any> = new EventEmitter();

  event: any;
  totalRecords: number;
  data: any;
  id: string;
  userform: FormGroup;
  submitted: boolean;
  sex: SelectItem[];
  description: string;
  patients: Patients[];
  datasource: Patients[];
  displayDialog: boolean;
  patient: Patients = {};
  newPatient: boolean;
  cols: any[];
  selectedPatient3: Patients[];
  loading: boolean;
  uploadedFiles: any[] = [];
  header_name =
    {
    Name:        'Name',
    Age:          'Age',
    Status:       'Status',
    Desease:      'Desease',
    Date_in:      '  Date in',
    Date_out:      'Date out',
    Sex:          'Sex',
    Description: 'Description',
      label: 'Are you sure that you want to delete these patients?'
  };
  private subscription: Subscription;
  constructor(private patientService: DoctorDataService,
              private messageService: MessageService,
              private messageuploadservice: MessageServiceService,
              private fb: FormBuilder, private common: CommonService,
              private router: Router, public auth: AuthService,
              private translate: TranslatingService,

              private route: ActivatedRoute,
              private confirmationService: ConfirmationService



  ) {



  }
  @HostListener('window:onbeforeunload', ['$event'])
  clearLocalStorage(event) {
    localStorage.clear();
  }

  switchLanguage(string) {

    this.translate.language = string;
    this.translate.switchLanguage(this.translate.language);
console.log(this.translate.language);
    if (this.translate.language === 'en'){
        this.header_name.Name =        'Name';
        this.header_name.Age =          'Age';
        this.header_name.Status =       'Status';
        this.header_name.Desease =      'Desease';
        this.header_name.Date_in =      '  Date in';
        this.header_name.Date_out =      'Date out';
        this.header_name.Sex =          'Sex';
        this.header_name.Description = 'Description';
        this.header_name.label = 'Are you sure that you want to delete these patients?'
    }else{
      this.header_name.Name        = 'Имя';
      this.header_name.Age         = 'Возраст';
      this.header_name.Status      = 'Статус';
      this.header_name.Desease     = 'Диагноз';
      this.header_name.Date_in     = 'Поступление';
      this.header_name.Date_out    = 'Выписка';
      this.header_name.Sex         = 'Пол';
      this.header_name.Description = 'Описание';
      this.header_name.label = 'Удалить этих пациэнтов?'
    }

  }

  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageuploadservice.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onBasicUpload(event) {
    this.messageuploadservice.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
  }
  showSuccess() {
    this.messageService.add({severity: 'success', summary: 'Success Message', detail: 'Order submitted'});
  }
  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => this.id = params['id']);

    this.patientService.getPatients(this.id).then(
      res => {
        setTimeout(() => {
          this.patients = res;
          this.patients = this.patients.reverse();

        },1500);
        //  this.datasource = res;
       //  this.totalRecords = this.datasource.length;
       //  this.datasource = this.datasource.reverse();
      }




      ,
        err => {
        if (err instanceof HttpErrorResponse) {
          console.log(err);
          if (err.status === 401 ) {
            this.router.navigate(['']);
          }
        }
      }
    );

    //
    // setTimeout(() => {
    //   console.log(this.patient);
    // },10000);

    this.cols = [
      { field: 'fullname',    header: this.header_name.Name          },
      { field: 'birthdate',   header: this.header_name.Age            },
      { field: 'status',      header: this.header_name.Status       },
      { field: 'desease',     header: this.header_name.Desease        },
      { field: 'date_in',     header: this.header_name.Date_in         },
      { field: 'date_out',    header: this.header_name.Date_out           },
      { field: 'sex',         header: this.header_name.Sex                },
      { field: 'description', header: this.header_name.Description        },

    ];
       this.sex = [];
       this.sex.push({label: 'Select Gender', value: ''});
       this.sex.push({label: 'Male', value: 'Male'});
       this.sex.push({label: 'Female', value: 'Female'});
       this.userform = this.fb.group(
         {
         'fullname': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
         'desease': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
         'date_in': new FormControl('',),
         'date_out': new FormControl(''),
         'status': new FormControl('', Validators.compose([Validators.required, Validators.minLength(2)])),
         'birthdate': new FormControl('', Validators.required),
         'sex': new FormControl('', Validators.required),
         'description': new FormControl(''),

       });
    this.loading = true;
     }

  loadCarsLazy(event2: LazyLoadEvent) {
    this.loading = true;

    setTimeout(() => {
      if (this.datasource) {
        this.patients = this.datasource.slice(event2.first, (event2.first + event2.rows));
        this.loading = false;
      }
    }, 1000);
  }
     customSort(event1: SortEvent) {

       event1.data.sort((data1, data2) => {
         const value1 = data1[event1.field];
         const value2 = data2[event1.field];
         let result = null;

         if (value1 == null && value2 != null) {
           result = -1;
         } else if (value1 != null && value2 == null) {
           result = 1;
              } else if (value1 == null && value2 == null) {
           result = 0;
              } else if (typeof value1 === 'string' && typeof value2 === 'string') {
           result = value1.localeCompare(value2);
              } else {
           result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
              }

         return (event1.order * result);
       });
     }


     // upload file

  fileChange(event, id) {
    this.selectedPatient3.length = 1;
    for (let i = 0; i < this.selectedPatient3.length; i++)
    {
      id = this.selectedPatient3[i]._id;
    }
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
  confirm() {
    this.confirmationService.confirm({
      message: this.header_name.label,
      accept: () => {
        let selected = this.selectedPatient3;
        let deleted = this.patients;
        if (selected){
          this.patients = _.difference(this.patients, this.selectedPatient3);


          this.common.DeletePatient(selected)
            .subscribe(res => {

              },
              err => console.log(err)
            );
          selected.length = 0;
        }
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Patient Deleted'});
        return this.patients;
      }
    });
  }

  deleting(){


  }
   // удаление пациента
     delete(  ) {
   this.confirm()


     }
     index( rowIndex ) {
       rowIndex = 'Petrovich';
       const index = this.patients.indexOf(rowIndex);

       console.log( index);

     }

  showDialogToAdd() {
    this.newPatient = true;
    this.patient = {};
    this.displayDialog = true;
  }


  click(id)
  {
    console.log(id);
}
  onSubmit() {
    this.submitted = true;
    let patients = [...this.patients];
    if (this.newPatient) {
      this.common.AddPatient(this.id, this.userform.value)
        .subscribe(
        res => {
          localStorage.setItem('token', res.token);
         patients.unshift(res.registeredUser) ;
          console.log(res.registeredUser);
        },
        err => console.log(err)

    );

      // patients.unshift(this.userform.value);
    }
    this.patients = patients;
    console.log(this.userform.value);
    this.submitted = true;
    this.displayDialog = false;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Patient added'});
    this.userform.reset();
  }
  get diagnostic() { return JSON.stringify(this.userform.value); }

}

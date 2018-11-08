import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import {StatisticService} from '../../../services/api/statistic.service';
import {DoctorDataService} from '../../../services/doctor-data.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/api/auth.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  providers: [MessageService]
})
export class StatisticsComponent implements OnInit {
  id: any;
  patient: any;
  body_graph: any;
  userform: FormGroup;
  submitted: boolean;
  hand: SelectItem[];
  started_time: any;
  training_type: string[] = [];
  graphic: any;
  data: any;
  val: any;
  private subscription: Subscription;
  constructor(private _location: Location,
              private fb: FormBuilder,
              private messageService: MessageService, private statservice: StatisticService, private graphservice: DoctorDataService,
              private route: ActivatedRoute,
              public auth: AuthService
  ) {
    this.data = {
      labels: [],
      datasets: [
        {
          label: 'first dataset',
          data: [],
          fill: true,
          borderColor: '#00c093'
        }

      ]
    };

  }

   selectData(event) {
    this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail':
        this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }

  backClicked() {
    this._location.back();
  }

  onSubmit(value: any) {
    this.data.labels = [];
    this.data.datasets[0].data = [];
    this.statservice.GetGraph(this.id,  this.userform.value).subscribe(
      data1 => {
        this.body_graph = data1;
      },
      error1 => {

        console.log(error1);


      }

    );

   setTimeout(() => {
   }, 150);

    let data = this.userform.value;
    const userform = this.userform.value.val;
    this.submitted = true;
    if (userform !== 'custom') {
     this.userform.value.from = null;
     this.userform.value.to = null;
    }


    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Diagram added'});


    setTimeout(() => {
    this.build_graphic();

     }, 1200);


    this.userform.reset();
  }

  build_graphic()
  {


      for (let i = 0; i < this.body_graph.graphic.length; i++ )
      {

        for (let j = 0; j < this.body_graph.graphic[i].value.length; j++)
        {
          this.data.datasets[0].data.push(this.body_graph.graphic[i].value[j].oX);
          this.data.labels.push(this.body_graph.graphic[i].started_time);
        }
      }
  }

  ngOnInit()
  {

    this.subscription = this.route.params.subscribe(params => this.id = params['id']);
    this.graphservice
      .getPatient(this.id)
      .then((respone) => {
        this.patient = respone;

      });

    /* форма для получения графика */
    this.userform = this.fb.group({
      'hand': new FormControl('', Validators.required),
      'training_type': new FormControl('',   ),
      'val': new FormControl('', Validators.required),
      'from': new FormControl('',  ),
      'to': new FormControl('',  ),
      'from2': new FormControl('',  ),
      'to2': new FormControl('',  )
    });
    this.hand = [];
    this.hand.push({label: 'Select hand',  value: ''});
    this.hand.push({label: 'Left', value: '0'});
    this.hand.push({label: 'Right', value: '1'});

  }

  reset() {
 // this.data.labels = [];
 // this.data.datasets[1] = [];
    this.userform.reset();
  }

}

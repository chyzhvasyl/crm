import { Component, OnInit } from '@angular/core';
// import {MenuItem} from 'primeng/api';
import {TranslatingService} from '../../../services/translate.service';
import {CommonService} from '../../../services/api/common.service';
import { AuthService } from '../../../services/api/auth.service';
import { Router } from '@angular/router';
import {User} from './user';
import * as $ from 'jquery';



@Component({
  selector: 'app-entry-page',
  templateUrl: './entry-page.component.html',
  styleUrls: ['./entry-page.component.css' ]

})
export class EntryPageComponent implements OnInit {
  user: User = new User();
  data: any;
  data2: any;
  error: any;
  id_doctor: any;

  constructor(private translate: TranslatingService, private commonservice: CommonService, private _auth: AuthService,
              private _router: Router) {
  }
  switchLanguage(string) {
    this.translate.language = string;
    this.translate.switchLanguage(this.translate.language);
  }
  // items: MenuItem[];
  signin() {
    // window.location.reload();
    this._auth.loginUser(this.user)
      .subscribe(
        res => {
 this.ClearScreen();
          localStorage.setItem('token', res.json().token);
          this._router.navigate([`/personal/${res.json()._id}`]);
        },
        err => {
          this.error = err.status;
        }
      );
  }
  ClearScreen(){
    $(document).ready(function () {
      const div1 = $('.modal-backdrop');
      const div2 = $('.fade');
      const div3 = $('.show');
      div1.removeClass('modal-backdrop');
      div2.removeClass('fade');
      div3.removeClass('show');
    });

  }
  ngOnInit() {
    //this.commonservice.GetDoctors().subscribe(data => this.data = data);
    //this.commonservice.GetPatients().subscribe(data => this.data2 = data);

  }
}

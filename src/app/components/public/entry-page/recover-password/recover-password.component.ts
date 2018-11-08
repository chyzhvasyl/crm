import { Component, OnInit } from '@angular/core';
import {TranslatingService} from "../../../../services/translate.service";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {
input_mail = 'Put the mail';
  constructor(private translate: TranslatingService) { }
  switchLanguage(string) {
    this.translate.language = string;
    if(string === 'rus'){
      this.input_mail = 'Введите почту';
    }
    else {
      this.input_mail = 'Put the mail';
    }
    this.translate.switchLanguage(this.translate.language);
  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})



export class TranslatingService {
language: string;


  constructor(private translate: TranslateService, ) {
  this.language = "en";
    translate.setDefaultLang('en');
  }
  switchLanguage(language)
{

this.language = language;
    this.translate.use(language);
  }
}

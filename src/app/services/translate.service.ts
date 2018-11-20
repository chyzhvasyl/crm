import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatingService {
language: string;
englishCols = [
    { field: 'fullname',    header:   'Имя' },
    { field: 'birthdate',   header:   'Возраст'   },
    { field: 'status',      header:   'Статус' },
    { field: 'desease',     header:   'Диагноз'  },
    { field: 'date_in',     header:   'Поступление'      },
    { field: 'date_out',    header:   'Выписка'      },
    { field: 'sex',         header:   'Пол'       },
    { field: 'description', header:   'Описание'    },
  ];
russianCols = [
    { field: 'fullname',    header:   'Имя' },
    { field: 'birthdate',   header:   'Возраст'   },
    { field: 'status',      header:   'Статус' },
    { field: 'desease',     header:   'Диагноз'  },
    { field: 'date_in',     header:   'Поступление'      },
    { field: 'date_out',    header:   'Выписка'      },
    { field: 'sex',         header:   'Пол'       },
    { field: 'description', header:   'Описание'    },
  ];

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

// angular  and primeng modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {OrderListModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ButtonModule} from 'primeng/button';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenubarModule} from 'primeng/menubar';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {AppRoutingModule, routing} from './components/routing/app-routing/app-routing.module';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/primeng';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputMaskModule} from 'primeng/inputmask';
import {KeyFilterModule} from 'primeng/keyfilter';
import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/listbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ChartModule} from 'primeng/chart';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
// components
import { AppComponent } from './app.component';
import { EntryPageComponent } from './components/public/entry-page/entry-page.component';
import { RecoverPasswordComponent } from './components/public/entry-page/recover-password/recover-password.component';
import { NotFoundComponent } from './components/public/entry-page/not-found/not-found.component';
import { DoctorOfficeComponent } from './components/secure/doctor-office/doctor-office.component';
import { PatientCardComponent } from './components/secure/patient-card/patient-card.component';

// services
import {TranslatingService} from './services/translate.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {UserService} from './services/user.service';
import {DoctorDataService} from './services/doctor-data.service';
import {CardinfoService} from './services/cardinfo.service';
import {MessageServiceService} from './services/message-service.service';
import {CommonService} from './services/api/common.service';
import {StatisticService} from './services/api/statistic.service';

// interfaces and classes
import {User} from './components/public/entry-page/user';
import { StatisticsComponent } from './components/secure/statistics/statistics.component';

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {AuthService} from './services/api/auth.service';
import {AuthGuard} from './services/auth.guard';
import {TokenInterceptorService} from './services/token-interceptor.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/lang/');
}

@NgModule({
  declarations: [
    AppComponent,
    EntryPageComponent,
    RecoverPasswordComponent,
    routing,
    NotFoundComponent,
    DoctorOfficeComponent,
    PatientCardComponent,
    StatisticsComponent

  ],

 schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  imports: [
    BrowserModule, AccordionModule, MenubarModule, OrderListModule, FormsModule, HttpModule, ButtonModule, BreadcrumbModule,
    BrowserAnimationsModule, HttpModule, InputMaskModule, KeyFilterModule, ToastModule, TableModule, DialogModule, HttpClientModule,
    AppRoutingModule, FileUploadModule, ReactiveFormsModule, PanelModule,   DropdownModule,   InputTextareaModule,   TabViewModule,
    CodeHighlighterModule, MessageModule, ListboxModule, RadioButtonModule, CheckboxModule, ChartModule, ConfirmDialogModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [User, UserService, TranslatingService, DoctorDataService, CardinfoService, MessageServiceService, CommonService,
    StatisticService, AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }

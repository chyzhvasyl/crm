import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RecoverPasswordComponent} from '../../public/entry-page/recover-password/recover-password.component';
import {EntryPageComponent} from '../../public/entry-page/entry-page.component';
import {NotFoundComponent} from '../../public/entry-page/not-found/not-found.component';
import {DoctorOfficeComponent} from '../../secure/doctor-office/doctor-office.component';
import {PatientCardComponent} from '../../secure/patient-card/patient-card.component';
import {StatisticsComponent} from '../../secure/statistics/statistics.component';
import {AuthGuard} from '../../../services/auth.guard';

const routes: Routes = [
 /* {    path: '',
    redirectTo: '',
    pathMatch: 'full'}*/
  {path: '', component : EntryPageComponent},
  {path: 'recover-password', component : RecoverPasswordComponent},
  {path: 'personal/:id', component : DoctorOfficeComponent, canActivate: [AuthGuard] //, runGuardsAndResolvers: 'always'
  },
  {path: 'patient-card/:id', component : PatientCardComponent, canActivate: [AuthGuard] },
  {path: 'statistics/:id', component : StatisticsComponent},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
     RouterModule.forRoot(routes /*, {onSameUrlNavigation: 'reload'} */)
  ],
  exports: [RouterModule],
  declarations: []
})


export class AppRoutingModule { }
export const routing = [RecoverPasswordComponent, EntryPageComponent, DoctorOfficeComponent,
                        NotFoundComponent, PatientCardComponent, StatisticsComponent] ;

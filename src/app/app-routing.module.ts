import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './components/appointments-list/appointments-list.component';
import { EditAppointmentComponent } from './components/edit-appointment/edit-appointment.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-appointment' },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'edit-appointment/:id', component: EditAppointmentComponent },
  { path: 'appointments-list', component: AppointmentListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

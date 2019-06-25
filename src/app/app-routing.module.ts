import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { AppointmentListComponent } from './appointments/appointments-list/appointments-list.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-appointment' },
  { path: 'add-appointment', component: AddAppointmentComponent },
  { path: 'edit-appointment/:id', component: EditAppointmentComponent },
  { path: 'appointments-list', component: AppointmentListComponent },
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'edit-doctor/:id', component: EditDoctorComponent },
  { path: 'doctors-list', component: DoctorsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Import Appointment Components
import { AddAppointmentComponent } from '../appointments/add-appointment/add-appointment.component';
import { AppointmentListComponent } from '../appointments/appointments-list/appointments-list.component';
import { EditAppointmentComponent } from '../appointments/edit-appointment/edit-appointment.component';

const routes: Routes = [

    { path: 'add-appointment', component: AddAppointmentComponent },
    { path: 'edit-appointment/:id', component: EditAppointmentComponent },
    { path: 'appointments-list', component: AppointmentListComponent },

];
@NgModule( {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppointmentsRoutingModule {}

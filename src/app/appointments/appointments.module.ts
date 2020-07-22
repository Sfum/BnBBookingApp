import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { CommonModule }                      from '@angular/common';

// Import Service
import { AppointmentService }                from './../appointments/appointment.service';

// Import Appointment Components
import { AddAppointmentComponent }           from './../appointments/add-appointment/add-appointment.component';
import { EditAppointmentComponent }          from './../appointments/edit-appointment/edit-appointment.component';
import { AppointmentListComponent }          from './../appointments/appointments-list/appointments-list.component';

import { FormsModule, ReactiveFormsModule }  from '@angular/forms';

// Import Routing Module
import { AppointmentsRoutingModule }         from './appointments-routing.module';

// Import Angular Material Module
import { AngularMaterialModule }             from './../material.module';
import { MatExpansionModule, MatTabsModule } from '@angular/material';

// Import Mde Popover
import { MdePopoverModule }                  from '@material-extended/mde';

@NgModule({
  declarations: [
    AddAppointmentComponent,
    EditAppointmentComponent,
    AppointmentListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatExpansionModule,
    MatTabsModule,
    MdePopoverModule,
    AppointmentsRoutingModule,
  ],
  providers: [AppointmentService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppointmentsModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { CommonModule }                      from '@angular/common';

// Import Service
import { DoctorService }                     from './../doctors/doctor.service';

// Import Doctors Components
import { AddDoctorComponent }                from '../doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent }               from '../doctors/edit-doctor/edit-doctor.component';
import { DoctorsListComponent }              from '../doctors/doctors-list/doctors-list.component';

import { FormsModule, ReactiveFormsModule }  from "@angular/forms";

// Import Routing Module
import { DoctorsRoutingModule }              from "./doctors-routing.module";

// Import Angular Material Module
import { AngularMaterialModule }             from "./../material.module";
import { MatExpansionModule, MatTabsModule } from "@angular/material";

// Import Mde Popover
import { MdePopoverModule }                  from "@material-extended/mde";

@NgModule({
  declarations: [
    AddDoctorComponent,
    EditDoctorComponent,
    DoctorsListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatExpansionModule,
    MatTabsModule,
    MdePopoverModule,
    DoctorsRoutingModule,
  ],
  providers: [DoctorService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DoctorsModule {}

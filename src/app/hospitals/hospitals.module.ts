import { NgModule, CUSTOM_ELEMENTS_SCHEMA }   from '@angular/core';
import { CommonModule }                       from '@angular/common';

// Import Service
import { HospitalService } from './hospital.service';

// Import Hospitals Components
import { AddHospitalComponent }               from '../hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent }              from '../hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent }             from '../hospitals/hospitals-list/hospitals-list.component';

// Import Reactive Forms
import { FormsModule, ReactiveFormsModule }   from "@angular/forms";

// Import Routing Module 
import { HospitalsRoutingModule }             from "./hospitals-routing.module";

// Import Angular Material Module
import { AngularMaterialModule }              from '../material.module';
import { MatExpansionModule, MatTabsModule }  from '@angular/material';

// Import Mde Popover
import { MdePopoverModule }                   from '@material-extended/mde';

@NgModule({
  declarations: [
    AddHospitalComponent,
    EditHospitalComponent,
    HospitalsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    MatExpansionModule,
    MatTabsModule,
    MdePopoverModule,
    HospitalsRoutingModule,
  ],
  providers: [HospitalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HospitalsModule {}

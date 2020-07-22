import { BrowserModule }                     from '@angular/platform-browser';
import { AppComponent }                      from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";

// Import Hospitals Components
import { AddHospitalComponent }              from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent }             from './hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent }            from './hospitals/hospitals-list/hospitals-list.component';

// Import Angular Material Module
import { AngularMaterialModule }             from './material.module';
import { MatExpansionModule, MatTabsModule } from '@angular/material';

// Import Firebase
import { AngularFireModule }                 from '@angular/fire';
import { AngularFireDatabaseModule }         from '@angular/fire/database';
import { environment }                       from 'src/environments/environment';

// Import Services
import { HospitalService }                   from './hospitals/hospital.service';

// Import Directive
import { RoundEdgesDirective }               from './directives/roundEdges';

// Import Mde Popover
import { MdePopoverModule }                  from '@material-extended/mde';

// Import Modules
import { AppointmentsModule }                from './appointments/appointments.module';
import { DoctorsModule }                     from './doctors/doctors.module';
import { HospitalsModule }                   from './hospitals/hospitals.module';

@NgModule({
  declarations: [
    AppComponent,
    AddHospitalComponent,
    EditHospitalComponent,
    HospitalsListComponent,
    RoundEdgesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatTabsModule,
    MdePopoverModule,
    AppointmentsModule,
    DoctorsModule,
    HospitalsModule
  ],
  providers: [HospitalService],
  bootstrap: [AppComponent],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

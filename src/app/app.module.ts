import { BrowserModule }                     from '@angular/platform-browser';
import { AppRoutingModule }                  from './app-routing.module';
import { AppComponent }                      from './app.component';
import { BrowserAnimationsModule }           from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Doctors Components
import { AddDoctorComponent }                from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent }               from './doctors/edit-doctor/edit-doctor.component';
import { DoctorsListComponent }              from './doctors/doctors-list/doctors-list.component';

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

import { DoctorService }                     from './doctors/doctor.service';
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
    AddDoctorComponent,
    EditDoctorComponent,
    DoctorsListComponent,
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
  providers: [DoctorService, HospitalService],
  bootstrap: [AppComponent],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

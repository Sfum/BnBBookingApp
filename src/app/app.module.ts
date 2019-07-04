import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { AppointmentListComponent } from './appointments/appointments-list/appointments-list.component';

import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';

import { AddHospitalComponent } from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent } from './hospitals/hospitals-list/hospitals-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { AppointmentService } from './shared/appointment.service';
import { DoctorService } from './shared/doctor.service';
import { HospitalService } from './shared/hospital.service';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    AppointmentListComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    DoctorsListComponent,
    AddHospitalComponent,
    EditHospitalComponent,
    HospitalsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppointmentService, DoctorService, HospitalService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

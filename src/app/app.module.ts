import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import Appointment Components
import { AddAppointmentComponent } from './appointments/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './appointments/edit-appointment/edit-appointment.component';
import { AppointmentListComponent } from './appointments/appointments-list/appointments-list.component';

// Import Doctors Components
import { AddDoctorComponent } from './doctors/add-doctor/add-doctor.component';
import { EditDoctorComponent } from './doctors/edit-doctor/edit-doctor.component';
import { DoctorsListComponent } from './doctors/doctors-list/doctors-list.component';

// Import Hospitals Components
import { AddHospitalComponent } from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent } from './hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent } from './hospitals/hospitals-list/hospitals-list.component';

// Import Angular Material Module
import { AngularMaterialModule } from './material.module';
import { MatExpansionModule, MatTabsModule } from '@angular/material';

// Import Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

// Import Services
import { AppointmentService } from './services/appointment.service';
import { DoctorService } from './services/doctor.service';
import { HospitalService } from './services/hospital.service';

// Import Directive
import { RoundEdgesDirective } from './directives/roundEdges';

// Import Mde Popover
import { MdePopoverModule } from '@material-extended/mde';


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
    MdePopoverModule
  ],
  providers: [AppointmentService, DoctorService, HospitalService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

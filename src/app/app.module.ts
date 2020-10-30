import { BrowserModule }                     from '@angular/platform-browser';
import { AppComponent }                      from './app.component';
import { BrowserAnimationsModule }           from '@angular/platform-browser/animations';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { AppRoutingModule } from "./app-routing.module";

// Import Angular Material Module
import { AngularMaterialModule }             from './material.module';
import { MatExpansionModule, MatTabsModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';


// Import Firebase
import { AngularFireModule }                 from '@angular/fire';
import { AngularFireDatabaseModule }         from '@angular/fire/database';
import { environment }                       from 'src/environments/environment';

// Import Directive
import { RoundEdgesDirective }               from './directives/roundEdges';

// Import Mde Popover
import { MdePopoverModule }                  from '@material-extended/mde';

// Import Modules
import { AppointmentsModule }                from './appointments/appointments.module';
import { DoctorsModule }                     from './doctors/doctors.module';
import { HospitalsModule }                   from './hospitals/hospitals.module';

import { WelcomeComponent } from "./welcome/welcome.component";


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    RoundEdgesDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatExpansionModule,
    MatTabsModule,
    MdePopoverModule,
    AppointmentsModule,
    DoctorsModule,
    HospitalsModule,
    MatMenuModule
  ],
  bootstrap: [AppComponent],
  schemas:   [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

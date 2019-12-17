import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddAccommodationComponent } from './crud/accommodation-details/add-accommodation/add-accommodation.component';
import { EditAccommodationComponent } from './crud/accommodation-details/edit-accommodation/edit-accommodation.component';
import { AccommodationListComponent } from './crud/accommodation-details/accommodation-list/accommodation-list.component';
import { AddBookingComponent } from './crud/booking/add-booking/add-booking.component';
import { EditBookingComponent } from './crud/booking/edit-booking/edit-booking.component';
import { BookingsListComponent } from './crud/booking/bookings-list/bookings-list.component';
import { AddHostComponent } from './crud/host/add-host/add-host.component';
import { EditHostComponent } from './crud/host/edit-host/edit-host.component';
import { HostsListComponent } from './crud/host/hosts-list/hosts-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AddAccommodationComponent,
    EditAccommodationComponent,
    AccommodationListComponent,
    AddBookingComponent,
    EditBookingComponent,
    BookingsListComponent,
    AddHostComponent,
    EditHostComponent,
    HostsListComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

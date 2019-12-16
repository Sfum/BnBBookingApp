import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddAccomodationComponent } from './crud/accomodation-details/add-accomodation/add-accomodation.component';
import { EditAccomodationComponent } from './crud/accomodation-details/edit-accomodation/edit-accomodation.component';
import { AccomodationListComponent } from './crud/accomodation-details/accomodation-list/accomodation-list.component';
import { AddBookingComponent } from './crud/booking/add-booking/add-booking.component';
import { EditBookingComponent } from './crud/booking/edit-booking/edit-booking.component';
import { BookingsListComponent } from './crud/booking/bookings-list/bookings-list.component';
import { AddHostComponent } from './crud/host/add-host/add-host.component';
import { EditHostComponent } from './crud/host/edit-host/edit-host.component';
import { HostsListComponent } from './crud/host/hosts-list/hosts-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAccomodationComponent,
    EditAccomodationComponent,
    AccomodationListComponent,
    AddBookingComponent,
    EditBookingComponent,
    BookingsListComponent,
    AddHostComponent,
    EditHostComponent,
    HostsListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

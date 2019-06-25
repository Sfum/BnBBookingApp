import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class AppointmentService {
  appointmentsRef: AngularFireList<any>;
  appointmentRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create appointment */
  AddAppointment(appointment: Appointment) {
    this.appointmentsRef.push({
      book_name: appointment.book_name,
      isbn_10: appointment.isbn_10,
      author_name: appointment.author_name,
      publication_date: appointment.publication_date,
      binding_type: appointment.binding_type,
      in_stock: appointment.in_stock,
      languages: appointment.languages
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get appointment */
  GetAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments-list/' + id);
    return this.appointmentRef;
  }  

  /* Get appointment list */
  GetAppointmentList() {
    this.appointmentsRef = this.db.list('appointments-list');
    return this.appointmentsRef;
  }

  /* Update appointment */
  UpdateAppointment(id, appointment: Appointment) {
    this.appointmentRef.update({
      book_name: appointment.book_name,
      isbn_10: appointment.isbn_10,
      author_name: appointment.author_name,
      publication_date: appointment.publication_date,
      binding_type: appointment.binding_type,
      in_stock: appointment.in_stock,
      languages: appointment.languages
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete appointment */
  DeleteAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments-list/' + id);
    this.appointmentRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}

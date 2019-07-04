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

  /* Create appointment */
  AddAppointment(appointment: Appointment) {
    this.appointmentsRef.push({
      first_name: appointment.first_name,
      reference_number: appointment.reference_number,
      last_name: appointment.last_name,
      appointment_date: appointment.appointment_date,
      doctor_select: appointment.doctor_select,
      confirmation: appointment.confirmation,
      notes: appointment.notes
    })
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  /* Update appointment */
  UpdateAppointment(id, appointment: Appointment) {
    this.appointmentRef.update({
      first_name: appointment.first_name,
      reference_number: appointment.reference_number,
      last_name: appointment.last_name,
      appointment_date: appointment.appointment_date,
      doctor_select: appointment.doctor_select,
      confirmation: appointment.confirmation,
      notes: appointment.notes
    })
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  /* Delete appointment */
  DeleteAppointment(id: string) {
    this.appointmentRef = this.db.object('appointments-list/' + id);
    this.appointmentRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    });
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}

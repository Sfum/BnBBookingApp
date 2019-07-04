import { Injectable } from '@angular/core';
import { Doctor } from './doctor';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
  doctorsRef: AngularFireList<any>;
  doctorRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}


  /* Get doctor */
  GetDoctor(id: string) {
    this.doctorRef = this.db.object('doctors-list/' + id);
    return this.doctorRef;
  }

  /* Get doctor list */
  GetDoctorList() {
    this.doctorsRef = this.db.list('doctors-list');
    return this.doctorsRef;
  }

  /* Create doctor */
  AddDoctor(doctor: Doctor) {
    this.doctorsRef.push({
      doctor_name: doctor.doctor_name,
      doctor_number: doctor.doctor_number,
      hospital_names: doctor.hospital_names,
      new_patients: doctor.new_patients,
    })
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  /* Update doctor */
  UpdateDoctor(id, doctor: Doctor) {
    this.doctorRef.update({
      doctor_name: doctor.doctor_name,
      doctor_number: doctor.doctor_number,
      hospital_names: doctor.hospital_names,
      new_patients: doctor.new_patients,
    })
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  /* Delete doctor */
  DeleteDoctor(id: string) {
    this.doctorRef = this.db.object('doctors-list/' + id);
    this.doctorRef.remove()
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}

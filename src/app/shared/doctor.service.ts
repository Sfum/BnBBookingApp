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
      book_name: doctor.book_name,
      isbn_10: doctor.isbn_10,
      binding_type: doctor.binding_type,
      in_stock: doctor.in_stock,
    })
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  /* Update doctor */
  UpdateDoctor(id, doctor: Doctor) {
    this.doctorRef.update({
      book_name: doctor.book_name,
      isbn_10: doctor.isbn_10,
      binding_type: doctor.binding_type,
      in_stock: doctor.in_stock,
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

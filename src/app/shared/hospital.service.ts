import { Injectable } from '@angular/core';
import { Hospital } from './hospital';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class HospitalService {
  hospitalsRef: AngularFireList<any>;
  hospitalRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}


  /* Get hospital */
  GetHospital(id: string) {
    this.hospitalRef = this.db.object('hospitals-list/' + id);
    return this.hospitalRef;
  }

  /* Get hospital list */
  GetHospitalList() {
    this.hospitalsRef = this.db.list('hospitals-list');
    return this.hospitalsRef;
  }

  /* Create hospital */
  AddHospital(hospital: Hospital) {
    this.hospitalsRef.push({
      book_name: hospital.book_name,
      isbn_10: hospital.isbn_10,
      author_name: hospital.author_name,
      publication_date: hospital.publication_date,
      binding_type: hospital.binding_type,
      in_stock: hospital.in_stock,
      languages: hospital.languages
    })
      .catch(error => {
        this.errorMgmt(error);
      })
  }

  /* Update hospital */
  UpdateHospital(id, hospital: Hospital) {
    this.hospitalRef.update({
      book_name: hospital.book_name,
      isbn_10: hospital.isbn_10,
      author_name: hospital.author_name,
      publication_date: hospital.publication_date,
      binding_type: hospital.binding_type,
      in_stock: hospital.in_stock,
      languages: hospital.languages
    })
      .catch(error => {
        this.errorMgmt(error);
      })
  }

  /* Delete hospital */
  DeleteHospital(id: string) {
    this.hospitalRef = this.db.object('hospitals-list/' + id);
    this.hospitalRef.remove()
      .catch(error => {
        this.errorMgmt(error);
      })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}

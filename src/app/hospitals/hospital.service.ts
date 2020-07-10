import { Injectable }        from '@angular/core';
import { Hospital }          from './hospital';
import { AngularFireDatabase, 
         AngularFireList, 
         AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  hospitalsRef: AngularFireList  <any>;
  hospitalRef:  AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Get hospital
  GetHospital(id: string) {
    this.hospitalRef = this.db.object('hospitals-list/' + id);
    return this.hospitalRef;
  }

  // Get hospital list
  GetHospitalList() {
    this.hospitalsRef = this.db.list('hospitals-list');
    return this.hospitalsRef;
  }

  // Create hospital
  AddHospital(hospital: Hospital) {
    this.hospitalsRef.push({
         hospital_name:  hospital.hospital_name,
         contact_number: hospital.contact_number,
         address:        hospital.address,
    })
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  // Update hospital
  UpdateHospital(id, hospital: Hospital) {
    this.hospitalRef.update({
         hospital_name:  hospital.hospital_name,
         contact_number: hospital.contact_number,
         address:        hospital.address,
    })
      .catch(error => {
        this.errorMgmt(error);
      });
  }

  // Delete hospital
  DeleteHospital(id: string) {
    this.hospitalRef = this.db
                    .object('hospitals-list/' + id);
    this.hospitalRef.remove()
                    .catch(error => {
        this.errorMgmt(error);
      });
  }

  // Error managementng
  private errorMgmt(error) {
    console.log(error);
  }
}

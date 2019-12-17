import { Injectable } from '@angular/core';
import { AccommodationDetails } from '../models/accommodation-details';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AccommodationDetailsService {
  accommodationRef: AngularFireList<any>;
  accommodationObjectRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {

    // Get Accommodation
    // GetAccommodation(id: string) {
    //   this.accommodationObjectRef = this.db.object('accommodation-list/' + id);
    //   return this.accommodationObjectRef;
    // }

    // Get Accommodation List
    // GetAccommodationList() {
    //   this.accommodationRef = this.db.object('accommodation-list');
    //   return this.accommodationRef;
    // }

    // Add Accommodation

    // Update Accommodation

    // Delete Accommodation

  }
}

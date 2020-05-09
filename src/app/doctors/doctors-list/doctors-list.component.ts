import { Component, ViewChild }             from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location }                         from '@angular/common';

import { DoctorService }                    from '../../services/doctor.service';
import { Doctor }                           from '../../models/doctor';

@Component({
  selector:    'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls:  ['./doctors-list.component.css']
})

export class DoctorsListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource:     MatTableDataSource<Doctor>;
  DoctorData:     any = [];

  // Display Table Columns
  columnsDisplay: any[] = [
    'doctor_name',
    'doctor_number',
    'action'
  ];

  constructor(
    private doctorApi: DoctorService,
    private location:  Location) {

    // Get Doctor List
    this.doctorApi.GetDoctorList()
                  .snapshotChanges()
                  .subscribe(doctors => {
           doctors.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.DoctorData.push(a as Doctor);
        })

        // Data Table
        this.dataSource = new MatTableDataSource(this.DoctorData);
        // Pagination
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    });
  }
  // Delete Doctor
  deleteDoctor(index: number, e){
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
                   this.dataSource.data = data;
                   this.doctorApi.DeleteDoctor(e.$key);
    }
  }
  // Filtering
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
                                 .toLocaleLowerCase();
  }
  // Go Back
  goBack() {
    this.location.back();
  }
}

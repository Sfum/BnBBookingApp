import { Doctor } from './../../shared/doctor';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DoctorService } from './../../shared/doctor.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})

export class DoctorsListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Doctor>;
  DoctorData: any = [];
  columnsDisplay: any[] = [
    'doctor_name',
    'doctor_number',
    'action'
  ];
  constructor(
    private doctorApi: DoctorService,
    private location: Location) {
    this.doctorApi.GetDoctorList()
    .snapshotChanges().subscribe(doctors => {
        doctors.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.DoctorData.push(a as Doctor)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.DoctorData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
  }
  deleteDoctor(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.doctorApi.DeleteDoctor(e.$key)
    }
  }
  goBack(){
    this.location.back();
  }
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';

import { HospitalService } from './../../shared/hospital.service';
import { Hospital } from './../../shared/hospital';


@Component({
  selector: 'app-hospitals-list',
  templateUrl: './hospitals-list.component.html',
  styleUrls: ['./hospitals-list.component.css']
})

export class HospitalsListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Hospital>;
  HospitalData: any = [];
  columnsDisplay: any[] = [
    'hospital_name',
    'address',
    'action'
  ];
  constructor(
    private hospitalApi: HospitalService,
    private location: Location) {
    this.hospitalApi.GetHospitalList()
    .snapshotChanges().subscribe(hospitals => {
        hospitals.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.HospitalData.push(a as Hospital);
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.HospitalData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    });
  }
  deleteHospital(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.hospitalApi.DeleteHospital(e.$key);
    }
  }
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  goBack() {
    this.location.back();
  }
}

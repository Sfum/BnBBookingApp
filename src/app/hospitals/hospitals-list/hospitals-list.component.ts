import { Hospital } from './../../shared/hospital';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { HospitalService } from './../../shared/hospital.service';

@Component({
  selector: 'app-hospitals-list',
  templateUrl: './hospitals-list.component.html',
  styleUrls: ['./hospitals-list.component.css']
})

export class HospitalsListComponent {
  
  dataSource: MatTableDataSource<Hospital>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  HospitalData: any = [];
  columnsDisplay: any[] = [
    'book_name',
    'author_name',
    'in_stock',
    'action'
  ];
  
  constructor(private hospitalApi: HospitalService){
    this.hospitalApi.GetHospitalList()
    .snapshotChanges().subscribe(hospitals => {
        hospitals.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.HospitalData.push(a as Hospital)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.HospitalData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
  }

  /* Delete */
  deleteHospital(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.hospitalApi.DeleteHospital(e.$key)
    }
  }
}

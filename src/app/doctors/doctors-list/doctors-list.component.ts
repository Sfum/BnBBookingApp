import { Doctor } from './../../shared/doctor';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { DoctorService } from './../../shared/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})

export class DoctorsListComponent {
  
  dataSource: MatTableDataSource<Doctor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  DoctorData: any = [];
  columnsDisplay: any[] = [
    'book_name',
    'author_name', 
    'publication_date',
    'in_stock',
    'action'
  ];
  
  constructor(private doctorApi: DoctorService){
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

  /* Delete */
  deleteDoctor(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.doctorApi.DeleteDoctor(e.$key)
    }
  }
  
}

import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location } from '@angular/common';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';


@Component({
  selector: 'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls: ['./appointments-list.component.css'],
})

export class AppointmentListComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  AppointmentData: any = [];
  dataSource: MatTableDataSource<Appointment>;
  columnsDisplay: any[] = [
    'last_name',
    'appointment_date',
    'doctor_select',
    'action'
  ];
  constructor(
    private appointmentApi: AppointmentService,
    private location: Location
) {
    this.appointmentApi.GetAppointmentList()
    .snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.AppointmentData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    });
  }
  deleteAppointment(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.appointmentApi.DeleteAppointment(e.$key);
    }
  }
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.AppointmentData.controls[controlName].hasError(errorName);
  }
  goBack() {
    this.location.back();
  }
}

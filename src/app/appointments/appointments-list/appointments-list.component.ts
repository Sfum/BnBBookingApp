import { Component, ViewChild }             from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Location }                         from '@angular/common';

// import Appointment Services
import { AppointmentService }               from '../../services/appointment.service';

// import Appointment Model
import { Appointment }                      from '../../models/appointment';

@Component({
  selector:    'app-appointments-list',
  templateUrl: './appointments-list.component.html',
  styleUrls:  ['./appointments-list.component.css'],
})

export class AppointmentListComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  AppointmentData: any = [];
  dataSource:      MatTableDataSource<Appointment>;

  // Get Column Display Tabs
  columnsDisplay:  any[] = [
    'last_name',
    'appointment_date',
    'action'
  ];
  constructor(
    private appointmentApi: AppointmentService,
    private location:       Location
) {
    // Display Appointment List
    this.appointmentApi.GetAppointmentList()
                       .snapshotChanges()
                       .subscribe(appointments => { appointments
                       .forEach(item => {
          let a = item.payload
                       .toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment)
        })

        // Data Table
        this.dataSource = new MatTableDataSource(this.AppointmentData);

        // Pagination
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    });
  }
  // Delete Appointment
  deleteAppointment(index: number, e) {
    if (window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * 
                   this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.appointmentApi.DeleteAppointment(e.$key);
    }
  }
  // Search Filtering
  doFilter = (value: string) => {
    this.dataSource.filter = value.trim()
                                 .toLocaleLowerCase();
  }

  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.AppointmentData
               .controls[controlName]
               .hasError(errorName);
  }

  // Go Back
  goBack() {
    this.location.back();
  }
}

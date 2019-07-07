import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
  AppointmentData: any = [];
  editAppointmentForm: FormGroup;
  selected: any;

  ngOnInit() {
    this.updateAppointmentForm();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.appointmentApi.GetAppointment(id).valueChanges().subscribe(data => {
      this.editAppointmentForm.setValue(data);

      this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment);
        });
      });
    });
  }
  updateAppointmentForm(){
    this.editAppointmentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      reference_number: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      doctor_select: ['', [Validators.required]],
      confirmation: ['Yes'],
    });
  }
  updateAppointment() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
      this.appointmentApi.UpdateAppointment(id, this.editAppointmentForm.value);
      this.router.navigate(['appointments-list']);
    }
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.editAppointmentForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editAppointmentForm.get('appointment_date').setValue(convertDate, {
      onlyself: true
    });
  }
  goBack() {
    this.location.back();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';
import { HospitalService } from '../../shared/hospital.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  @ViewChild('resetAppointmentForm') myNgForm;
  AppointmentData: any = [];
  selected: any;
  appointmentForm: FormGroup;
  ngOnInit() {
    this.appointmentApi.GetAppointmentList();
    this.doctorApi.GetDoctorList();
    this.submitAppointmentForm();
  }
  // Constructor
  constructor(
    public fb: FormBuilder,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService,
    private hospitalApi: HospitalService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment);
      });
    });
  }
  submitAppointmentForm() {
    this.appointmentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      reference_number: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      doctor_select: ['', [Validators.required]],
      confirmation: [''],
    });
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.appointmentForm.get('appointment_date').setValue(convertDate, {
      onlyself: true
    });
  }
  resetForm() {
    this.appointmentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      reference_number: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      doctor_select: ['', [Validators.required]],
      confirmation: ['No'],
    });
  }
  submitAppointment() {
    if (this.appointmentForm.valid) {
      this.appointmentApi.AddAppointment(this.appointmentForm.value)
      this.resetForm();
      this.router.navigate(['appointments-list']);
    }
  }
  goBack() {
    this.location.back();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';
import { HospitalService } from '../../shared/hospital.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  @ViewChild('resetAppointmentForm') myNgForm;
  @ViewChild( MdePopoverTrigger, {}) trigger: MdePopoverTrigger;
  AppointmentData: any = [];
  selected: any;
  appointmentForm: FormGroup;
  ngOnInit() {
    this.appointmentApi.GetAppointmentList();
    this.doctorApi.GetDoctorList();
    this.submitAppointmentForm();
  }
  constructor(
    public fb: FormBuilder,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService,
    private hospitalApi: HospitalService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    // Get Doctors List
    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment);
      });
    });
  }
  // Submit Appointment Form
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
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }
  // Format Date
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.appointmentForm.get('appointment_date').setValue(convertDate, {
      onlyself: true
    });
  }
  // Reset Form
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
  // Submit Appointment
  submitAppointment() {
    if (this.appointmentForm.valid) {
      this.appointmentApi.AddAppointment(this.appointmentForm.value)
      this.resetForm();
      this.router.navigate(['appointments-list']);
    }
  }
  // Go Back
  goBack() {
    this.location.back();
  }
  // Close PopOver
  closePopover() {
    this.trigger.togglePopover();
  }
  onSubmit() {

    this.closePopover();
  }
}

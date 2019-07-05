import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { DoctorService } from './../../shared/doctor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from '../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';
import { HospitalService } from '../../shared/hospital.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  @ViewChild('resetDoctorForm') myNgForm;
  doctorForm: FormGroup;
  AppointmentData: any = [];


  ngOnInit() {
    this.doctorApi.GetDoctorList();
    this.submitDoctorForm();
  }
  constructor(
    public fb: FormBuilder,
    private doctorApi: DoctorService,
    private appointmentApi: AppointmentService,
    private hospitalApi: HospitalService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.hospitalApi.GetHospitalList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment);
      });
    });
  }
  submitDoctorForm() {
    this.doctorForm = this.fb.group({
      doctor_name: ['', [Validators.required]],
      doctor_number: ['', [Validators.required]],
      hospital_names: ['', [Validators.required]],
      new_patients: ['Yes'],
    });
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.doctorForm.controls[controlName].hasError(errorName);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  resetForm() {
    this.doctorForm.reset();
    Object.keys(this.doctorForm.controls).forEach(key => {
      this.doctorForm.controls[key].setErrors(null);
    });
  }
  submitDoctor() {
    if (this.doctorForm.valid) {
      this.doctorApi.AddDoctor(this.doctorForm.value)
      this.resetForm();
      this.router.navigate(['doctors-list']);
    }
  }
}


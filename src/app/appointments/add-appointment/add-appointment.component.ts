import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';
import { HospitalService } from '../../shared/hospital.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  @ViewChild('chipList') chipList;
  @ViewChild('resetAppointmentForm') myNgForm;
  selectable = true;
  removable = true;
  addOnBlur = true;
  AppointmentData: any = [];
  AppointmentData1: any = [];
  notesArray: Language[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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

    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment);
      });
    });

    this.hospitalApi.GetHospitalList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData1.push(a as Appointment);
      });
    });
  }
  remove(language: Language): void {
    const index = this.notesArray.indexOf(language);
    if (index >= 0) {
      this.notesArray.splice(index, 1);
    }
  }
  submitAppointmentForm() {
    this.appointmentForm = this.fb.group({
      first_name: ['', [Validators.required]],
      reference_number: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      doctor_select: ['', [Validators.required]],
      confirmation: ['Yes'],
      notes: [this.notesArray],
    });
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.notesArray.length < 5) {
      this.notesArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.appointmentForm.get('appointment_date').setValue(convertDate, {
      onlyself: true
    })
  }
  resetForm() {
    this.notesArray = [];
    this.appointmentForm.reset();
    Object.keys(this.appointmentForm.controls).forEach(key => {
      this.appointmentForm.controls[key].setErrors(null);
    });
  }
  submitAppointment() {
    if (this.appointmentForm.valid){
      this.appointmentApi.AddAppointment(this.appointmentForm.value)
      this.resetForm();
      this.router.navigate(['appointments-list']);
    }
  }
  goBack(){
    this.location.back();
  }
}

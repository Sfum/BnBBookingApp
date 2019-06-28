import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatTableDataSource } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';

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
  languageArray: Language[] = [];
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
    private location: Location
  ) {

    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment)
      })
    })
  }
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }
  submitAppointmentForm() {
    this.appointmentForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray],
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() })
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.appointmentForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }
  resetForm() {
    this.languageArray = [];
    this.appointmentForm.reset();
    Object.keys(this.appointmentForm.controls).forEach(key => {
      this.appointmentForm.controls[key].setErrors(null)
    });
  }
  submitAppointment() {
    if (this.appointmentForm.valid){
      this.appointmentApi.AddAppointment(this.appointmentForm.value)
      this.resetForm();
    }
  }
  goBack(){
    this.location.back();
  }
}

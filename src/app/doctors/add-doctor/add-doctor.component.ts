import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { DoctorService } from './../../shared/doctor.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
  @ViewChild('chipList') chipList;
  @ViewChild('resetDoctorForm') myNgForm;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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
  submitDoctorForm() {
    this.doctorForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray]
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.doctorForm.controls[controlName].hasError(errorName);
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
    this.doctorForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }
  resetForm() {
    this.languageArray = [];
    this.doctorForm.reset();
    Object.keys(this.doctorForm.controls).forEach(key => {
      this.doctorForm.controls[key].setErrors(null)
    });
  }
  submitDoctor() {
    if (this.doctorForm.valid){
      this.doctorApi.AddDoctor(this.doctorForm.value)
      this.resetForm();
      this.router.navigate(['doctors-list']);
    }
  }
  goBack(){
    this.location.back();
  }
}


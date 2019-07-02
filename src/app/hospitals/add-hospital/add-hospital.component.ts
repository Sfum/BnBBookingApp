import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Appointment } from '../../shared/appointment';
import { AppointmentService } from '../../shared/appointment.service';
import { HospitalService } from '../../shared/hospital.service';
import { DoctorService } from './../../shared/doctor.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  @ViewChild('chipList') chipList;
  @ViewChild('resetHospitalForm') myNgForm;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  AppointmentData: any = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  hospitalForm: FormGroup;

  ngOnInit() {
    this.hospitalApi.GetHospitalList();
    this.submitHospitalForm();
  }
  constructor(
    public fb: FormBuilder,
    private hospitalApi: HospitalService,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment)
      });
    });
  }
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }
  submitHospitalForm() {
    this.hospitalForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray]
    });
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.hospitalForm.controls[controlName].hasError(errorName);
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
    this.hospitalForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    });
  }
  resetForm() {
    this.languageArray = [];
    this.hospitalForm.reset();
    Object.keys(this.hospitalForm.controls).forEach(key => {
      this.hospitalForm.controls[key].setErrors(null)
    });
  }
  submitHospital() {
    if (this.hospitalForm.valid){
      this.hospitalApi.AddHospital(this.hospitalForm.value)
      this.resetForm();
      this.router.navigate(['hospitals-list']);
    }
  }
  goBack(){
    this.location.back();
  }
}

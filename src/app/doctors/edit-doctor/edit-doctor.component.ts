import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppointmentService } from '../../shared/appointment.service';
import { HospitalService } from '../../shared/hospital.service';
import { DoctorService } from './../../shared/doctor.service';
import {Appointment} from '../../shared/appointment';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})

export class EditDoctorComponent implements OnInit {
  @ViewChild('chipList') chipList;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editDoctorForm: FormGroup;
  AppointmentData: any = [];


  ngOnInit() {
    this.updateDoctorForm();
    this.doctorApi.GetDoctorList();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService,
    private hospitalApi: HospitalService,
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.doctorApi.GetDoctor(id).valueChanges().subscribe(data => {
      this.languageArray = data.languages;
      this.editDoctorForm.setValue(data);

      this.hospitalApi.GetHospitalList().snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment)
        })
      })
    })
  }
  updateDoctorForm(){
    this.editDoctorForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [''],
    })
  }
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({name: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.editDoctorForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editDoctorForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }
  goBack(){
    this.location.back();
  }
  updateDoctor() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.doctorApi.UpdateDoctor(id, this.editDoctorForm.value);
      this.router.navigate(['doctors-list']);
    }
  }
}

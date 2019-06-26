import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
  @ViewChild('chipList') chipList;
  selectable = true;
  AppointmentData: any = [];
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  editAppointmentForm: FormGroup;

  ngOnInit() {
    this.updateAppointmentForm();
  }
  constructor(
    public fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private appointmentApi: AppointmentService,
    private doctorApi: DoctorService,
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.appointmentApi.GetAppointment(id).valueChanges().subscribe(data => {
      this.languageArray = data.languages;
      this.editAppointmentForm.setValue(data);

      this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment)
        })
      })
    })
  }
  updateAppointmentForm(){
    this.editAppointmentForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: ['', [Validators.required]]
    })
  }
  updateAppointment() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
      this.appointmentApi.UpdateAppointment(id, this.editAppointmentForm.value);
      this.router.navigate(['appointments-list']);
    }
  }
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;

    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({name: value.trim()});
    }

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
    return this.editAppointmentForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editAppointmentForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }
  goBack(){
    this.location.back();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppointmentService } from './../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';

import { DoctorService } from './../../shared/doctor.service';
import { Doctor } from '../../shared/doctor';

export interface Language {
  name: string;
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {
  visible = true;
  selectable = true;
  AppointmentData: any = [];
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
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

  /* Update form */
  updateAppointmentForm(){
    this.editAppointmentForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: ['']
    })
  }

  /* Add language */
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

  /* Remove language */
  remove(language: any): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editAppointmentForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editAppointmentForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  /* Submit appointment */
  updateAppointment() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.appointmentApi.UpdateAppointment(id, this.editAppointmentForm.value);
      this.router.navigate(['appointments-list']);
    }
  }

}

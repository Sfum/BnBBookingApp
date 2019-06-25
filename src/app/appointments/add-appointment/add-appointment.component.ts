import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AppointmentService } from './../../shared/appointment.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  AppointmentData: any = [];
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetAppointmentForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  appointmentForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() {
    this.appointmentApi.GetAppointmentList();
    this.submitAppointmentForm();
  }

  constructor(
    public fb: FormBuilder,
    private appointmentApi: AppointmentService
  ) {}

  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Reactive appointment form */
  submitAppointmentForm() {
    this.appointmentForm = this.fb.group({
      book_name: ['', [Validators.required]],
      isbn_10: ['', [Validators.required]],
      author_name: ['', [Validators.required]],
      publication_date: ['', [Validators.required]],
      binding_type: ['', [Validators.required]],
      in_stock: ['Yes'],
      languages: [this.languageArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic languages */
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

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.appointmentForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.appointmentForm.reset();
    Object.keys(this.appointmentForm.controls).forEach(key => {
      this.appointmentForm.controls[key].setErrors(null)
    });
  }

  /* Submit appointment */
  submitAppointment() {
    if (this.appointmentForm.valid){
      this.appointmentApi.AddAppointment(this.appointmentForm.value)
      this.resetForm();
    }
  }

}

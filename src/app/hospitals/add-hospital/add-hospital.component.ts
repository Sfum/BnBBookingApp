import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { HospitalService } from './../../shared/hospital.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetHospitalForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  hospitalForm: FormGroup;
  BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

  ngOnInit() {
    this.hospitalApi.GetHospitalList();
    this.submitHospitalForm();
  }

  constructor(
    public fb: FormBuilder,
    private hospitalApi: HospitalService
  ) { }

  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }

  /* Reactive hospital form */
  submitHospitalForm() {
    this.hospitalForm = this.fb.group({
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
    return this.hospitalForm.controls[controlName].hasError(errorName);
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
    this.hospitalForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.hospitalForm.reset();
    Object.keys(this.hospitalForm.controls).forEach(key => {
      this.hospitalForm.controls[key].setErrors(null)
    });
  }

  /* Submit hospital */
  submitHospital() {
    if (this.hospitalForm.valid){
      this.hospitalApi.AddHospital(this.hospitalForm.value)
      this.resetForm();
    }
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Appointment } from '../../shared/appointment';
import { AppointmentService } from '../../shared/appointment.service';
import { HospitalService } from '../../shared/hospital.service';
import { DoctorService } from './../../shared/doctor.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls: ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {
  @ViewChild('resetHospitalForm') myNgForm;
  @ViewChild( MdePopoverTrigger, {}) trigger: MdePopoverTrigger;
  AppointmentData: any = [];
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
    // Get Doctor List
    this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.AppointmentData.push(a as Appointment);
      });
    });
  }
  // Submit Hospital Form
  submitHospitalForm() {
    this.hospitalForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.hospitalForm.controls[controlName].hasError(errorName);
  }
  // Format Date
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.hospitalForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    });
  }
  // Reset Form
  resetForm() {
    this.hospitalForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }
  // Submit Hospital
  submitHospital() {
    if (this.hospitalForm.valid) {
      this.hospitalApi.AddHospital(this.hospitalForm.value)
      this.resetForm();
      this.router.navigate(['hospitals-list']);
    }
  }
  // Go Back
  goBack() {
    this.location.back();
  }
  // Close Popover
  closePopover() {
    this.trigger.togglePopover();
  }
  onSubmit() {

    this.closePopover();
  }
}

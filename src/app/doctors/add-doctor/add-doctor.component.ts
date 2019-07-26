import { Component, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { AppointmentService } from '../../shared/appointment.service';
import { Appointment } from '../../shared/appointment';
import { HospitalService } from '../../shared/hospital.service';
import { DoctorService } from './../../shared/doctor.service';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  @ViewChild('resetDoctorForm') myNgForm;
  @ViewChild( MdePopoverTrigger, {}) trigger: MdePopoverTrigger;
  doctorForm: FormGroup;
  HospitalData: any = [];
  selected: any;
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
    // Get Hospital List, Subscribe & Push
    this.hospitalApi.GetHospitalList().snapshotChanges().subscribe(appointments => {
      appointments.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.HospitalData.push(a as Appointment);
      });
    });
  }
  // Submit Doctors Form / Validation
  submitDoctorForm() {
    this.doctorForm = this.fb.group({
      doctor_name: ['', [Validators.required]],
      doctor_number: ['', [Validators.required]],
      hospital_names: ['', [Validators.required]],
      new_patients: ['Yes'],
    });
  }
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.doctorForm.controls[controlName].hasError(errorName);
  }
  // Reset Form / Validation
  resetForm() {
    this.doctorForm = this.fb.group({
      doctor_name: ['', [Validators.required]],
      doctor_number: ['', [Validators.required]],
      hospital_names: ['', [Validators.required]],
      new_patients: ['Yes'],
    });
  }
  // Submit Doctor
  submitDoctor() {
    if (this.doctorForm.valid) {
      this.doctorApi.AddDoctor(this.doctorForm.value)
      this.resetForm();
      this.router.navigate(['doctors-list']);
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


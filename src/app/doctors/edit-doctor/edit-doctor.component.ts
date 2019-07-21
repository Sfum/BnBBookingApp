import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Appointment } from '../../shared/appointment';
import { AppointmentService } from '../../shared/appointment.service';
import { HospitalService } from '../../shared/hospital.service';
import { DoctorService } from './../../shared/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.css']
})

export class EditDoctorComponent implements OnInit {
  @ViewChild('chipList') chipList;
  editDoctorForm: FormGroup;
  HospitalData: any = [];
  selected: any;
  ngOnInit() {
    this.doctorApi.GetDoctorList();
    this.updateDoctorForm();
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
    // Get Doctor By Id
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.doctorApi.GetDoctor(id).valueChanges().subscribe(data => {
      this.editDoctorForm.setValue(data);
    // Get Hospital List
      this.hospitalApi.GetHospitalList().snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.HospitalData.push(a as Appointment);
        });
      });
    });
  }
  // Update Doctor Form
  updateDoctorForm() {
    this.editDoctorForm = this.fb.group({
      doctor_name: ['', [Validators.required]],
      doctor_number: ['', [Validators.required]],
      hospital_names: ['', [Validators.required]],
      new_patients: ['Yes'],
    });
  }
  // Update Doctor
  updateDoctor() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')) {
      this.doctorApi.UpdateDoctor(id, this.editDoctorForm.value);
      this.router.navigate(['doctors-list']);
    }
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.editDoctorForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editDoctorForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    });
  }
  goBack() {
    this.location.back();
  }
}

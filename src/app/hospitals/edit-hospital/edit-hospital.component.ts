import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HospitalService } from './../../shared/hospital.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppointmentService } from '../../shared/appointment.service';
import { DoctorService } from '../../shared/doctor.service';
import { Appointment } from '../../shared/appointment';

@Component({
  selector: 'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls: ['./edit-hospital.component.css']
})

export class EditHospitalComponent implements OnInit {
  editHospitalForm: FormGroup;
  AppointmentData: any = [];

  ngOnInit() {
    this.updateHospitalForm();
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
    this.hospitalApi.GetHospital(id).valueChanges().subscribe(data => {
      this.editHospitalForm.setValue(data);

      this.doctorApi.GetDoctorList().snapshotChanges().subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.AppointmentData.push(a as Appointment);
        });
      });
    });
  }
  updateHospitalForm() {
    this.editHospitalForm = this.fb.group({
      hospital_name: ['', [Validators.required]],
      contact_number: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }
  updateHospital() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')) {
      this.hospitalApi.UpdateHospital(id, this.editHospitalForm.value);
      this.router.navigate(['hospitals-list']);
    }
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.editHospitalForm.controls[controlName].hasError(errorName);
  }
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editHospitalForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    });
  }
  goBack() {
    this.location.back();
  }
}

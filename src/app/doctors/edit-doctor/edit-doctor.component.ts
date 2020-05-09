import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { Location }                           from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import Appointment Model
import { Appointment }                        from '../../models/appointment';

// import Services
import { AppointmentService }                 from '../../services/appointment.service';
import { HospitalService }                    from '../../services/hospital.service';
import { DoctorService }                      from '../../services/doctor.service';

@Component({
  selector:    'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls:  ['./edit-doctor.component.css']
})

export class EditDoctorComponent implements OnInit {

  editDoctorForm: FormGroup;
  HospitalData:   any = [];
  selected:       any;

  ngOnInit() {
    this.doctorApi.GetDoctorList();
    this.updateDoctorForm();
  }
  constructor(
    public  fb:          FormBuilder,
    private location:    Location,
    private actRoute:    ActivatedRoute,
    private router:      Router,
    private doctorApi:   DoctorService,
    private hospitalApi: HospitalService,
  ) {

    // Get Doctor, Subscribe & Push
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.doctorApi.GetDoctor(id)
                  .valueChanges()
                  .subscribe(data => {
      this.editDoctorForm.setValue(data);

    // Get Hospital, Subscribe & Push
      this.hospitalApi.GetHospitalList()
                      .snapshotChanges()
                      .subscribe(appointments => {
          appointments.forEach(item => {
          let a = item.payload
                      .toJSON();
          a['$key'] = item.key;
          this.HospitalData.push(a as Appointment);
        });
      });
    });
  }
  // Update Doctor Form / Validation
  updateDoctorForm() {
    this.editDoctorForm = this.fb.group({
         doctor_name:    ['', [Validators.required]],
         doctor_number:  ['', [Validators.required]],
         hospital_names: ['', [Validators.required]],
         new_patients:   ['Yes'],
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
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.editDoctorForm.controls[controlName].hasError(errorName);
  }
  goBack() {
    this.location.back();
  }
}

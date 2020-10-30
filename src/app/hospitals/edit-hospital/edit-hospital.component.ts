import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { Location }                           from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import Services
import { HospitalService }                    from '../hospital.service';


@Component({
  selector:    'app-edit-hospital',
  templateUrl: './edit-hospital.component.html',
  styleUrls:  ['./edit-hospital.component.scss']
})

export class EditHospitalComponent implements OnInit {

  editHospitalForm: FormGroup;
  AppointmentData:  any = [];

  ngOnInit() {
    this.updateHospitalForm();
  }
  constructor(
    public  fb:          FormBuilder,
    private location:    Location,
    private actRoute:    ActivatedRoute,
    private router:      Router,
    private hospitalApi: HospitalService,
  ) {

    // Get Hospital, Subscribe & Push
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.hospitalApi.GetHospital(id)
                    .valueChanges()
                    .subscribe(data => {
      this.editHospitalForm.setValue(data);
    });
  }

  // Update Hospital Form / Validation
  updateHospitalForm() {
    this.editHospitalForm = this.fb.group({
         hospital_name:  ['', [Validators.required]],
         contact_number: ['', [Validators.required]],
         address:        ['', [Validators.required]],
    });
  }

  // Update Hospital
  updateHospital() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')) {
      this.hospitalApi.UpdateHospital(id, 
      this.editHospitalForm.value);
      this.router.navigate(['hospitals-list']);
    }
  }
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.editHospitalForm.controls[controlName].hasError(errorName);
  }
  // Go Back
  goBack() {
    this.location.back();
  }
}

import { Component, OnInit, ViewChild }       from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location }                           from '@angular/common';
import { ActivatedRoute, Router }             from '@angular/router';

// import Services
import { HospitalService }                    from '../../services/hospital.service';

// import Mde Popover
import { MdePopoverTrigger }                  from '@material-extended/mde';

@Component({
  selector:    'app-add-hospital',
  templateUrl: './add-hospital.component.html',
  styleUrls:  ['./add-hospital.component.css']
})
export class AddHospitalComponent implements OnInit {

  @ViewChild('resetHospitalForm')    myNgForm;
  @ViewChild( MdePopoverTrigger, {}) trigger: MdePopoverTrigger;

  hospitalForm: FormGroup;

  ngOnInit() {
    this.hospitalApi.GetHospitalList();
    this.submitHospitalForm();
  }
  constructor(
    public  fb:          FormBuilder,
    private hospitalApi: HospitalService,
    private location:    Location,
    private router:      Router,
  ) {}

  // Submit Hospital Form / Validation
  submitHospitalForm() {
    this.hospitalForm = this.fb.group({
         hospital_name:  ['', [Validators.required]],
         contact_number: ['', [Validators.required]],
         address:        ['', [Validators.required]]
    });
  }

  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.hospitalForm.controls[controlName].hasError(errorName);
  }

  // Reset Form
  resetForm() {
    this.hospitalForm = this.fb.group({
         hospital_name:  [''],
         contact_number: [''],
         address:        [''],
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
}

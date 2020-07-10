import { Component, OnInit, ViewChild }       from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location }                           from '@angular/common';
import { Router }                             from '@angular/router';

// import Appointment Model
import { Appointment }                        from '../../models/appointment';

// import Services
import { AppointmentService }                 from '../../services/appointment.service';
import { DoctorService }                      from '../../services/doctor.service';

// import Mde Popover
import { MdePopoverTrigger }                  from '@material-extended/mde';

@Component({
  selector:    'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls:  ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  @ViewChild('resetAppointmentForm') myNgForm;
  @ViewChild( MdePopoverTrigger, {}) trigger: MdePopoverTrigger;

  DoctorData:      any = [];
  selected:        any;
  appointmentForm: FormGroup;

  ngOnInit() {
    this.appointmentApi.GetAppointmentList();
    this.doctorApi.GetDoctorList();
    this.submitAppointmentForm();
  }
  constructor(
    public  fb:             FormBuilder,
    private appointmentApi: AppointmentService,
    private doctorApi:      DoctorService,
    private location:       Location,
    private router:         Router,
  ) {
    // Get Doctors List, Subscribe & Push
    this.doctorApi.GetDoctorList()
                  .snapshotChanges()
                  .subscribe(appointments => {
                             appointments.forEach(item => {
                             let a = item.payload.toJSON();
                             a['$key'] = item.key;
        this.DoctorData.push(a as Appointment);
      });
    });
  }

  // Submit Appointment Form / Validation
  submitAppointmentForm() {
    this.appointmentForm = this.fb.group({
      first_name:        ['', [Validators.required]],
      reference_number: ['', [Validators.required]],
      last_name:        ['', [Validators.required]],
      appointment_date: ['', [Validators.required]],
      doctor_select:    ['', [Validators.required]],
      confirmation:      ['', [Validators.required]],
    });
  }

  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.appointmentForm.controls[controlName].hasError(errorName);
  }

  // Format Date
  formatDate(e) {
    var convertDate = new Date(e.target.value)
                        .toISOString()
                        .substring(0, 10);
    this.appointmentForm.get('appointment_date')
                        .setValue(convertDate, {
      onlyself: true
    });
  }

  // Reset Form
  resetForm() {
    this.appointmentForm = this.fb.group({
      first_name:        [''],
      reference_number:  [''],
      last_name:         [''],
      appointment_date:  [''],
      doctor_select:     [''],
      confirmation:      [''],
    });
  }

  // Submit Appointment
  submitAppointment() {
    if (this.appointmentForm.valid) {
        this.appointmentApi.AddAppointment(this.appointmentForm.value)
        this.resetForm();
        this.router.navigate(['appointments-list']);
    }
  }

  // Go Back
  goBack() {
    this.location.back();
  }

  // Close PopOver
  closePopover() {
    this.trigger.togglePopover();
  }

  onSubmit() {
    this.closePopover();
  }
}

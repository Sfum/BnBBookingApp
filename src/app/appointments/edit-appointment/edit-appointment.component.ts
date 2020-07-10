import { Component, OnInit }                  from '@angular/core';
import { ActivatedRoute, Router }             from '@angular/router';
import { Location }                           from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import Appointment Model
import { Appointment }                        from '../../models/appointment';

// import Services
import { AppointmentService }                 from '../../services/appointment.service';
import { DoctorService }                      from '../../services/doctor.service';

@Component({
  selector:    'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls:  ['./edit-appointment.component.css']
})

export class EditAppointmentComponent implements OnInit {


  editAppointmentForm: FormGroup;
  selected:            any;
  DoctorData:          any = [];

  ngOnInit() {
    this.updateAppointmentForm();
  }
  constructor(
    public  fb:             FormBuilder,
    private location:       Location,
    private actRoute:       ActivatedRoute,
    private router:         Router,
    private appointmentApi: AppointmentService,
    private doctorApi:      DoctorService
  ) {
    // Get Appointment, Subscribe & Push
    var id = this.actRoute.snapshot.paramMap.get('id');

    this.appointmentApi.GetAppointment(id)
                       .valueChanges()
                       .subscribe(data => {
      this.editAppointmentForm.setValue(data);

    // Get Doctors List, Subscribe & Push
      this.doctorApi.GetDoctorList()
                    .snapshotChanges()
                    .subscribe(appointments => {
        appointments.forEach(item => {
          let a = item.payload
                    .toJSON();
          a['$key'] = item.key;
          this.DoctorData.push(a as Appointment);
        });
      });
    });
  }
  // Update Appointment Form / Validation
  updateAppointmentForm() {
    this.editAppointmentForm = this.fb.group({
         first_name:        ['', [Validators.required]],
         reference_number:  ['', [Validators.required]],
         last_name:         ['', [Validators.required]],
         appointment_date:  ['', [Validators.required]],
         doctor_select:     ['', [Validators.required]],
         confirmation:      ['', [Validators.required]],
    });
  }
  // Update Appointment
  updateAppointment() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')) {
      this.appointmentApi.UpdateAppointment(id, 
      this.editAppointmentForm.value);
      this.router.navigate(['appointments-list']);
    }
  }
  // Error Handling
  public handleError = (controlName: string, errorName: string) => {
    return this.editAppointmentForm.controls[controlName]
               .hasError(errorName);
  }
  // Format Date
  formatDate(e) {
    var convertDate = new Date(e.target.value)
                            .toISOString()
                            .substring(0, 10);
    this.editAppointmentForm.get('appointment_date')
                            .setValue(convertDate, {
      onlyself: true
    });
  }
  // Go Back
  goBack() {
    this.location.back();
  }
}

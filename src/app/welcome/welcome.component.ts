import { Component } from '@angular/core';
import { HospitalService } from './../hospitals/hospital.service';
import { DoctorService } from './../doctors/doctor.service';
import { AppointmentService } from './../appointments/appointment.service';

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent
{
  constructor ( private hospitalService: HospitalService,
                private doctorService: DoctorService,
                private appointmentService: AppointmentService) {
                  
    
    
  }
}

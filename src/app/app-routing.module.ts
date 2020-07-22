import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// Import Doctors Components
import { DoctorsListComponent }     from './doctors/doctors-list/doctors-list.component';
import { EditDoctorComponent }      from './doctors/edit-doctor/edit-doctor.component';
import { AddDoctorComponent }       from './doctors/add-doctor/add-doctor.component';

// Import Hospitals Components
import { AddHospitalComponent }     from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent }    from './hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent }   from './hospitals/hospitals-list/hospitals-list.component';

// Defining Routes
const routes: Routes = [
  {
    path: "edit-appointment",
    loadChildren: () =>
      import("./appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
  },

  { path: "", pathMatch: "full", redirectTo: "edit-appointment" },
  { path: "add-doctor", component: AddDoctorComponent },
  { path: "edit-doctor/:id", component: EditDoctorComponent },
  { path: "doctors-list", component: DoctorsListComponent },
  { path: "add-hospital", component: AddHospitalComponent },
  { path: "edit-hospital/:id", component: EditHospitalComponent },
  { path: "hospitals-list", component: HospitalsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

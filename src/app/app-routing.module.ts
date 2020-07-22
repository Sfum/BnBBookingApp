import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

// Import Hospitals Components
import { AddHospitalComponent }     from './hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent }    from './hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent }   from './hospitals/hospitals-list/hospitals-list.component';

// Defining Routes
const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "appointments-list" },

  {
    path: "",
    loadChildren: () =>
      import("./appointments/appointments.module").then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("./doctors/doctors.module").then((m) => m.DoctorsModule),
  },

  { path: "add-hospital", component: AddHospitalComponent },
  { path: "edit-hospital/:id", component: EditHospitalComponent },
  { path: "hospitals-list", component: HospitalsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

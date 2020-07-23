import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';

// Defining Routes for Lazy Loading
const routes: Routes = [
  { path: "welcome", pathMatch: "full",  component: WelcomeComponent  },

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
  {
    path: "",
    loadChildren: () =>
      import("./hospitals/hospitals.module").then((m) => m.HospitalsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

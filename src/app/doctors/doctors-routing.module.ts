import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Doctors Components
import { DoctorsListComponent }     from '../doctors/doctors-list/doctors-list.component';
import { EditDoctorComponent }      from '../doctors/edit-doctor/edit-doctor.component';
import { AddDoctorComponent } from '../doctors/add-doctor/add-doctor.component';

const routes: Routes = [
  { path: "add-doctor", component: AddDoctorComponent },
  { path: "edit-doctor/:id", component: EditDoctorComponent },
  { path: "doctors-list", component: DoctorsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorsRoutingModule {}

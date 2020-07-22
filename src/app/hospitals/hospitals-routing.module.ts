import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Import Hospitals Components
import { AddHospitalComponent }     from '../hospitals/add-hospital/add-hospital.component';
import { EditHospitalComponent }    from '../hospitals/edit-hospital/edit-hospital.component';
import { HospitalsListComponent }   from '../hospitals/hospitals-list/hospitals-list.component';

const routes: Routes = [
  { path: "add-hospital", component: AddHospitalComponent },
  { path: "edit-hospital/:id", component: EditHospitalComponent },
  { path: "hospitals-list", component: HospitalsListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HospitalsRoutingModule {}

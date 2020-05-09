import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
   MatButtonModule,
   MatToolbarModule,
   MatIconModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatRadioModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatTooltipModule,
   MatTableModule,
   MatPaginatorModule,
} from '@angular/material';

@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule
   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatSidenavModule,
      MatListModule,
      MatGridListModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatCardModule
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule {}

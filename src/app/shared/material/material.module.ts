import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatPaginatorModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule,
  MatAutocompleteModule, MatCheckboxModule, MatExpansionModule, MatToolbarModule, MatDialogModule, MatIconModule,
  MatButtonModule, MatMenuModule, MatSelectModule, MatCardModule, MatTabsModule, MatListModule, MatStepperModule,
  MatButtonToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatRadioModule
} from "@angular/material";
import { CdkTableModule } from "@angular/cdk/table";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { fadeInAnimation, slideInOutAnimation } from './material.animations';

import { MatDateTime } from './material.datetime';
import { MatLatLong } from './material.latlong';
import { MatBooleanField } from './material.boolean';

const modules: any[] = [
  MatTableModule,
  MatSortModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  BrowserAnimationsModule,
  MatFormFieldModule,
  MatInputModule,
  CdkTableModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatToolbarModule,
  MatDialogModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatCardModule,
  MatTabsModule,
  MatListModule,
  MatStepperModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {
}

export { fadeInAnimation, slideInOutAnimation }
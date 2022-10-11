import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TranslateModule } from "@ngx-translate/core";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { NewGroupDialogComponent } from './components/new-group-dialog/new-group-dialog.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MaterialFileInputModule } from "ngx-material-file-input";

@NgModule( {
  imports: [
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MaterialFileInputModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    TranslateModule,
  ],
  declarations: [
    NewGroupDialogComponent
  ]
})
export class SharedModule {
}

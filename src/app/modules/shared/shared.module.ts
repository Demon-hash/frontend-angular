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
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatSelectModule } from "@angular/material/select";
import { TextareaAutosizeModule } from "ngx-textarea-autosize";

@NgModule( {
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
    MatSelectModule,
    FormsModule,
    TranslateModule,
    MaterialFileInputModule,
    TextareaAutosizeModule,
  ]
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";

const material = [
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatStepperModule,
  MatDividerModule,
  MatMenuModule,
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule
];

@NgModule({
  exports: [...material],
  imports: [...material]
})
export class MaterialModule { }

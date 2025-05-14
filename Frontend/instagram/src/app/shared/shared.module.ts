import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {NotificationComponent} from "./notification/notification.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LoadingSpinnerComponent,
    MaterialModule,
    NotificationComponent
  ]
})
export class SharedModule { }

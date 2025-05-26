import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {NotificationComponent} from "./components/notification/notification.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    NotificationComponent,
    ConfirmDialogComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  exports: [
    MaterialModule,
    NotificationComponent,
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {NotificationComponent} from "./notification/notification.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import { NavbarComponent } from './navbars/navbar/navbar.component';
import { UserNavbarComponent } from './navbars/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from './navbars/admin-navbar/admin-navbar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NotificationComponent,
    NavbarComponent,
    UserNavbarComponent,
    AdminNavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterLinkActive
  ],
  exports: [
    LoadingSpinnerComponent,
    MaterialModule,
    NotificationComponent,
    NavbarComponent,
    UserNavbarComponent,
    AdminNavbarComponent
  ]
})
export class SharedModule { }

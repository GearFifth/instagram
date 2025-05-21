import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import {NotificationComponent} from "./components/notification/notification.component";
import { NavbarComponent } from '../protected/navbar/components/navbar/navbar.component';
import { UserNavbarComponent } from '../protected/navbar/components/user-navbar/user-navbar.component';
import { AdminNavbarComponent } from '../protected/navbar/components/admin-navbar/admin-navbar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NotificationComponent,
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
    NotificationComponent
  ]
})
export class SharedModule { }

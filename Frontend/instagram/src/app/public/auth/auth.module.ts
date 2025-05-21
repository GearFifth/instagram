import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";
import { RegistrationComponent } from './components/registration/registration.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

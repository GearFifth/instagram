import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {AuthRoutingModule} from "./auth-routing.module";
import { RegistrationComponent } from './components/registration/registration.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProfilePictureComponent } from './components/registration/registration-steps/profile-picture/profile-picture.component';
import { PersonalInfoComponent } from './components/registration/registration-steps/personal-info/personal-info.component';
import { ContactInfoComponent } from './components/registration/registration-steps/contact-info/contact-info.component';
import { PasswordComponent } from './components/registration/registration-steps/password/password.component';
import { VerificationComponent } from './components/registration/registration-steps/verification/verification.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    VerifyEmailComponent,
    ProfilePictureComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    PasswordComponent,
    VerificationComponent
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

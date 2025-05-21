import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {NgModule} from "@angular/core";
import {LoginGuard} from "../../core/guards/login.guard";
import {RegistrationComponent} from "./components/registration/registration.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegistrationComponent, canActivate: [LoginGuard] },
  { path: 'verify-email', component: VerifyEmailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

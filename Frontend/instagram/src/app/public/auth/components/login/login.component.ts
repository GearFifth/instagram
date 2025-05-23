import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {LoginRequest} from "../../../../core/models/login-request.model";
import {NotificationType} from "../../../../shared/components/notification/notification.component";
import {ROUTE_PATHS} from "../../../../core/constants/routes";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  errorMessage: string = "";

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    // todo: handle else case as well
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(loginRequest).subscribe({
        next: () => {
          this.router.navigate(["/" + ROUTE_PATHS.POSTS_ROOT]);
        },
        error: (err) => {
          // console.log("Error: ", err);
          this.errorMessage = "Invalid username or password";
          // this.errorMessage = err;
        }
      });
    }
  }
  onHandleError() {
    this.errorMessage = "";
  }

  protected readonly NotificationType = NotificationType;
}

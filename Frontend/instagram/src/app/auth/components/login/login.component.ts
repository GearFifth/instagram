import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../auth.service";
import {LoginRequest} from "../../models/login-request.model";
import {NotificationType} from "../../../shared/notification/notification.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide: boolean = true;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email || "",
        password: this.loginForm.value.password || ""
      }
      this.authService.login(loginRequest).subscribe({
        next: () => {
          this.router.navigate(['tasks']);
        },
        error: (err) => {
          // this.errorMessage = "Invalid username or password";
          this.errorMessage = err;
        }
      });
    }
  }
  onHandleError() {
    this.errorMessage = "";
  }

  protected readonly NotificationType = NotificationType;
}

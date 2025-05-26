import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth.service";
import {LoginRequest} from "../../../../core/models/login-request.model";
import {ROUTE_PATHS} from "../../../../core/constants/routes";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _snackBar = inject(MatSnackBar);
  loginForm: FormGroup;
  hide: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  onSubmit() {
    const loginRequest: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate([ROUTE_PATHS.POSTS]);
      },
      error: (err) => {
        this._snackBar.open("Invalid username or password", "OK")
      }
    });
  }

  goToRegister(){
    this.router.navigate([ROUTE_PATHS.AUTH_REGISTER]);
  }
}

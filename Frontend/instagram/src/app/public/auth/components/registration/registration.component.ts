import {Component, inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {confirmPasswordValidator} from "../../../../shared/validators/confirm-password.validator";
import {AuthService} from "../../../../core/services/auth.service";
import {RegisterRequest} from "../../../../core/models/register-request.model";
import {UserService} from "../../../../protected/features/users/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ROUTE_PATHS} from "../../../../core/constants/routes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  isEditable: boolean = true;

  registerPersonalForm!: FormGroup;
  registerContactForm!: FormGroup;
  registerPasswordForm!: FormGroup;

  profilePictureFile: File | null = null;
  profilePictureUrl: string | null = null;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.registerPersonalForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.registerContactForm = this.formBuilder.group({
      phone: ['', [Validators.pattern("^\\+?[0-9]{7,15}$"), Validators.required]],
      address: ['', Validators.required]
    });

    this.registerPasswordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        passwordConfirmation: ['', Validators.required]
      },
      {
        validators: confirmPasswordValidator
      }
    );
  }

  register() {
    if (this.registerPersonalForm.invalid || this.registerContactForm.invalid || this.registerPasswordForm.invalid) {
      return;
    }

    const request: RegisterRequest = {
      email: this.registerPersonalForm.value.email,
      password: this.registerPasswordForm.value.password,
      firstName: this.registerPersonalForm.value.firstName,
      lastName: this.registerPersonalForm.value.lastName,
      address: this.registerContactForm.value.address,
      phoneNumber: this.registerContactForm.value.phone,
      profileImage: this.profilePictureFile
    };

    this.authService.register(request).subscribe({
      next: () => {
        this._snackBar.open("Registration successful", "OK")
      },
      error: () => {
        this._snackBar.open("Registration failed", "OK")
      },
    });
  }

  checkEmailUniqueness(stepper: MatStepper) {
    const emailControl : AbstractControl | null = this.registerPersonalForm.get('email')
    const email = emailControl?.value;
    if (email) {
      this.userService.checkEmailUniqueness(email).subscribe({
        next: (isUnique) => {
          if (!isUnique) {
            emailControl?.setErrors({ nonUnique: true });
          }
          stepper.next();
        }
      });
    }
  }

  stepBack(stepper: MatStepper, currentForm: FormGroup) {
    currentForm.markAllAsTouched();
    stepper.previous();
  }

  goToLogin(){
    this.router.navigate([ROUTE_PATHS.AUTH_LOGIN]);
  }

}

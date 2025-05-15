import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {confirmPasswordValidator} from "../../validators/confirm-password.validator";
import {AuthService} from "../../auth.service";
import {RegisterRequest} from "../../models/register-request.model";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  hide: boolean = true;
  isEditable: boolean = true;

  registerPersonalForm!: FormGroup;
  registerContactForm!: FormGroup;
  registerPasswordForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {}

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
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      },
      {
        validator: confirmPasswordValidator
      }
    );
  }

  register() {
    if (this.registerPersonalForm.invalid || this.registerContactForm.invalid || this.registerPasswordForm.invalid) {
      return;
    }
    console.log(this.registerPersonalForm)
    console.log(this.registerContactForm)
    console.log(this.registerPasswordForm)

    this.isEditable = false;

    const request: RegisterRequest = {
      email: this.registerPersonalForm.value.email,
      password: this.registerPasswordForm.value.password,
      firstName: this.registerPersonalForm.value.firstName,
      lastName: this.registerPersonalForm.value.lastName,
      address: this.registerContactForm.value.address,
      phoneNumber: this.registerContactForm.value.phone,
    };

    this.authService.register(request).subscribe({
      next: () => {
        console.log("Registration successful");
      },
      error: (err) => {
        console.error('Registration failed:', err);
      },
    });
  }

  checkEmailUniqueness(stepper: MatStepper) {
    if (this.registerPersonalForm.valid) {
      stepper.next();
    } else {
      this.registerPersonalForm.markAllAsTouched();
      console.log("Form is invalid:", this.registerPersonalForm.errors);
    }

    //TODO

    // const email = this.registerPersonalForm.get('email')?.value;
    // if (email) {
    //   this.authService.checkEmailUniqueness(email).subscribe({
    //     next: (isUnique) => {
    //       if (!isUnique) {
    //         this.registerContactForm.get('email')?.setErrors({ nonUnique: true });
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error checking email uniqueness:', err);
    //     },
    //   });
    // }
  }

  stepBack(stepper: MatStepper, currentForm: FormGroup) {
    currentForm.markAllAsTouched();
    stepper.previous();
  }
}

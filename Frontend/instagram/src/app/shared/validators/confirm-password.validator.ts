import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordControl: AbstractControl | null = control.get("password");
  const passwordConfirmationControl: AbstractControl | null = control.get("passwordConfirmation");

  const password = passwordControl?.value;
  const passwordConfirmation = passwordConfirmationControl?.value;
  const isMatchingPassword = password === passwordConfirmation;

  isMatchingPassword ? passwordConfirmationControl?.setErrors(null) : passwordConfirmationControl?.setErrors({PasswordNoMatch: true});

  return isMatchingPassword ? null : { PasswordNoMatch: true };
};

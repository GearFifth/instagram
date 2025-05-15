import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const passwordConfirmation = control.get('passwordConfirmation')?.value;

  const isMatchingPassword = password === passwordConfirmation;

  if(!isMatchingPassword){
    control.get('passwordConfirmation')?.setErrors({PasswordNoMatch: true})
  }
  else {
    control.get('passwordConfirmation')?.setErrors(null);
  }

  return isMatchingPassword ? null : { PasswordNoMatch: true };
};

import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrl: './password.component.css'
})
export class PasswordComponent {
  @Input() registerPasswordForm!: FormGroup;
  @Input() register!: () => void;

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  toggleHidePassword() {
    this.hidePassword = !this.hidePassword;
  }

  toggleHideConfirmPassword() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}

import {Component, Inject} from '@angular/core';
import {User} from "../../models/user.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageService} from "../../../../../core/services/image.service";
import {ImageDetails} from "../../../../../shared/models/image-details.model";
import {UpdateUserRequest} from "../../models/update-user-request.model";
import {ChangePasswordRequest} from "../../../../../core/models/change-password-request.model";
import {AuthService} from "../../../../../core/services/auth.service";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  user!: User;
  passwordForm: FormGroup;
  isLoading: boolean = false;
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onChangeClick() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.isLoading = true;

    const request: ChangePasswordRequest = {
      currentPassword: this.passwordForm.value.oldPassword,
      newPassword: this.passwordForm.value.newPassword,
    };

    this.authService.changePassword(request).subscribe({
      next: () => {
        this.dialogRef.close(true);
        console.log("Change successful");
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Change failed:', err);
        this.isLoading = false;
      },
    });
  }
}

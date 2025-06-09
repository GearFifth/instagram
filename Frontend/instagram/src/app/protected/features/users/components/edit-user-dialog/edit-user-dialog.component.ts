import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {ImageService} from "../../../../../core/services/image.service";
import {UpdateUserRequest} from "../../models/update-user-request.model";
import {environment} from "../../../../../../env/env";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);
  user!: User;
  userForm: FormGroup;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: string | null = this.defaultProfileImagePath;
  profileImageFile: File | null = null;

  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.user = data.user;
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      phoneNumber: [''],
    });
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.userForm.patchValue(this.data.user);
      this.profileImageUrl = environment.server + this.user.profileImage.path;
    }
  }

  onImageSelected(file: File) {
    if (this.profileImageUrl) {
      URL.revokeObjectURL(this.profileImageUrl);
    }
    this.profileImageFile = file ?? null;
    this.profileImageUrl = file ? URL.createObjectURL(file) : null;
  }


  removeImage(): void {
    this.profileImageUrl = this.defaultProfileImagePath;
    this.profileImageFile = null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEditClick() {
    if (this.userForm.invalid) {
      return;
    }
    this.isLoading = true;

    const request: UpdateUserRequest = {
      id: this.data.user.id,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      address: this.userForm.value.address,
      phoneNumber: this.userForm.value.phoneNumber,
      profileImage: this.profileImageFile
    };

    this.userService.update(request).subscribe({
      next: (user: User) => {
        this.dialogRef.close(user);
        this._snackBar.open("Update successful", "OK")
      },
      error: (err) => {
        this._snackBar.open("Update failed", "OK")
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}

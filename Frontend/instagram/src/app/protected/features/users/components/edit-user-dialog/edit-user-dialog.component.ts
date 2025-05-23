import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {UserService} from "../../user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../models/user.model";
import {ImageService} from "../../../../../core/services/image.service";
import {ImageDetails} from "../../../../../shared/models/image-details.model";
import {UpdateUserRequest} from "../../models/update-user-request.model";

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent implements OnInit{
  user!: User;
  userForm: FormGroup;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: string | ArrayBuffer = this.defaultProfileImagePath;
  profileImageFile: File | null = null;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
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
      this.loadProfileImage();
    }
  }

  loadProfileImage() {
    if (this.user.profileImage) {
      this.imageService.getImage(this.user.profileImage.id).subscribe({
        // todo: this logic is used before, if I remember correctly
        // create method that we will be reused
        next: (blob: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.profileImageUrl = reader.result as string;

            this.profileImageFile = new File([blob], this.user.profileImage.originalName || 'profile-image.jpg', {
              type: blob.type
            });

          };
          reader.readAsDataURL(blob);
        },
        error: (err) => {
          console.error('Error loading profile image:', err);
          this.profileImageUrl = '/default-profile-image.png';
        }
      });
    } else {
      this.profileImageUrl = '/default-profile-image.png';
    }
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.profileImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.profileImageUrl = reader.result as string;
      reader.readAsDataURL(input.files[0]);
    }
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

    if (this.profileImageFile) {
      this.imageService.uploadImage(this.profileImageFile, "users").subscribe({
        next: (image: ImageDetails) => {
          console.log("Successfully uploaded image", image);

          const request: UpdateUserRequest = {
            id: this.data.user.id,
            firstName: this.userForm.value.firstName,
            lastName: this.userForm.value.lastName,
            address: this.userForm.value.address,
            phoneNumber: this.userForm.value.phoneNumber,
            profileImageId: image.id
          };

          this.userService.update(request).subscribe({
            next: (user: User) => {
              this.dialogRef.close(user);
              console.log("Update successful");
              this.isLoading = false;
            },
            error: (err) => {
              console.error('Update failed:', err);
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Error uploading image', err);
          this.isLoading = false;
        },
      });
    }
  }
}

import {Component, ElementRef, inject, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../post.service";
import {CreatePostRequest} from "../../../../../core/models/create-post-request.model";
import {ImageService} from "../../../../../core/services/image.service";
import {ImageDetails} from "../../../../../shared/models/image-details.model";
import {Post} from "../../models/post.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.css'
})
export class CreatePostDialogComponent {
  private _snackBar = inject(MatSnackBar);
  loggedUserId: string;
  description: string = '';
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
  ) {
    this.loggedUserId = data.loggedUserId;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onCreateClick() {
    const createRequest: CreatePostRequest = {
      description: this.description,
      authorId: this.loggedUserId,
      image: this.selectedImage
    };

    this.postService.createPost(createRequest).subscribe({
      next: (post: Post) => {
        this._snackBar.open("Successfully created post", "OK");
        this.dialogRef.close(post);
      },
      error: () => {
        this._snackBar.open("Error while creating a post", "OK");
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}

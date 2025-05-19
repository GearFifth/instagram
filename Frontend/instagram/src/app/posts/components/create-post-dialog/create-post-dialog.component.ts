import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PostService} from "../../post.service";
import {CreatePostRequest} from "../../models/create-post-request.model";
import {ImageService} from "../../../shared/images/image.service";
import {ImageDetails} from "../../../shared/images/image-details.model";
import {Post} from "../../models/post.model";

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrl: './create-post-dialog.component.css'
})
export class CreatePostDialogComponent {
  loggedUserId: string;
  description: string = '';
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<CreatePostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService,
    private imageService: ImageService
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

  async onCreateClick() {
    try {
      if (this.selectedImage) {
        this.imageService.uploadImage(this.selectedImage, "posts").subscribe({
          next: (imageDetails: ImageDetails) => {

            const createRequest: CreatePostRequest = {
              description: this.description,
              authorId: this.loggedUserId,
              imageId: imageDetails.id
            };

            this.postService.createPost(createRequest).subscribe({
              next: (post: Post) => {
                console.log("successfully created: ", post);
                this.dialogRef.close(post);
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}

import {Component, EventEmitter, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css'
})
export class ImageUploaderComponent {
  imageChangedEvent: any = '';
  showCropper = false;
  imageFile! : File | null;

  @Output() imageCroppedEvent = new EventEmitter<File>();

  fileChangeEvent(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.imageFile = file;
      this.imageChangedEvent = event;
      this.showCropper = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      const fileName = this.imageFile?.name ?? 'cropped-image.png';

      const croppedFile = new File([event.blob], fileName, {
        type: event.blob.type,
      });

      this.imageFile = croppedFile;
      this.imageCroppedEvent.emit(croppedFile);
    }
  }

  imageLoaded() {

  }

  cropperReady() {

  }

  loadImageFailed() {
    console.error('Error loading image uploader component');
  }

  onFinishClick() {
    this.showCropper = false;
  }
}

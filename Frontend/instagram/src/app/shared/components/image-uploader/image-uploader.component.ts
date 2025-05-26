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

  @Output() imageCroppedEvent = new EventEmitter<ImageCroppedEvent>();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.showCropper = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imageCroppedEvent.emit(event);
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

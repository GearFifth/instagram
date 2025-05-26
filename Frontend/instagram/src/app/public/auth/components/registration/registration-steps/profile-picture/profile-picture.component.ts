import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {
  @Input() profilePictureUrl: string | null = null;
  @Input() profilePictureFile: Blob | null = null;

  @Output() profilePictureUrlChange = new EventEmitter<string | null>();
  @Output() profilePictureFileChange = new EventEmitter<Blob | null>();

  onImageSelected(event: ImageCroppedEvent) {
    this.profilePictureUrlChange.emit(event.objectUrl);
    this.profilePictureFileChange.emit(event.blob);
  }

  removeImage() {
    this.profilePictureFileChange.emit(null);
    this.profilePictureUrlChange.emit(null);
  }
}

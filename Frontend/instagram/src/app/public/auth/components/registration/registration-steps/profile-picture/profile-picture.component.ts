import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrl: './profile-picture.component.css'
})
export class ProfilePictureComponent {
  @Input() profilePictureUrl: string | null = null;
  @Input() profilePictureFile: File | null = null;

  @Output() profilePictureUrlChange = new EventEmitter<string | null>();
  @Output() profilePictureFileChange = new EventEmitter<File | null>();

  onImageSelected(file: File) {
    this.profilePictureUrlChange.emit(URL.createObjectURL(file));
    this.profilePictureFileChange.emit(file);
  }

  removeImage() {
    this.profilePictureFileChange.emit(null);
    this.profilePictureUrlChange.emit(null);
  }
}

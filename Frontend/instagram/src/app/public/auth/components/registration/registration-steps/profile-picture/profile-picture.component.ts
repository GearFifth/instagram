import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    this.profilePictureFileChange.emit(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.profilePictureUrlChange.emit(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.profilePictureFileChange.emit(null);
    this.profilePictureUrlChange.emit(null);
  }
}

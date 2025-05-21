import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../../../core/services/image.service";
import {ROUTE_PATHS} from "../../../../../core/constants/routes";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent implements OnInit{
  @Input() user: User = {} as User;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;

  @Output() onUserCardClicked = new EventEmitter();

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.loadProfileImage();
  }

  loadProfileImage() {
    this.imageService.getImage(this.user.profileImage.id).subscribe({
      next: (blob: Blob) => {
        const objectURL = URL.createObjectURL(blob);
        this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      },
      error: (err) => {
        console.error('Error loading profile image:', err);
        this.profileImageUrl = '/default-profile-image.png';
      }
    });
  }

  goToProfilePage() {
    console.log("goToProfilePage");
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.user.id]);
    this.onUserCardClicked.emit();
  }
}

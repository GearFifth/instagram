import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../posts/models/post.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../../../../core/services/image.service";
import {ROUTE_PATHS} from "../../../../../../core/constants/routes";
import {User} from "../../../models/user.model";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-user-recommendation-card',
  templateUrl: './user-recommendation-card.component.html',
  styleUrl: './user-recommendation-card.component.css'
})
export class UserRecommendationCardComponent implements OnInit{
  @Input()
  user!: User;

  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
  }

  ngOnInit() {
    this.loadProfileImage();
  }

  loadProfileImage() {
    if (this.user.profileImage) {
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
    } else {
      this.profileImageUrl = '/default-profile-image.png';
    }
  }

  goToProfilePage() {
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.user.id]);
  }

}

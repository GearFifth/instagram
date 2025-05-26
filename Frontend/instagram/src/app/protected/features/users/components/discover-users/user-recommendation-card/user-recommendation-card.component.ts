import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../../../../core/services/image.service";
import {ROUTE_PATHS} from "../../../../../../core/constants/routes";
import {User} from "../../../models/user.model";
import {Route, Router} from "@angular/router";
import {environment} from "../../../../../../../env/env";

@Component({
  selector: 'app-user-recommendation-card',
  templateUrl: './user-recommendation-card.component.html',
  styleUrl: './user-recommendation-card.component.css'
})
export class UserRecommendationCardComponent{
  @Input()
  user!: User;

  defaultProfileImagePath: string = '/assets/default-profile-image.png';

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
  }

  goToProfilePage() {
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.user.id]);
  }

  setDefaultProfileImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultProfileImagePath;
  }

    protected readonly environment = environment;
}

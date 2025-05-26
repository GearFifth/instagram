import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../../../core/services/image.service";
import {ROUTE_PATHS} from "../../../../../core/constants/routes";
import {User} from "../../models/user.model";
import {Router} from "@angular/router";
import {environment} from "../../../../../../env/env";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user: User = {} as User;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';

  @Output() onUserCardClicked = new EventEmitter();

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer, private router: Router) {
  }

  goToProfilePage() {
    console.log("goToProfilePage");
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.user.id]);
    this.onUserCardClicked.emit();
  }

  setDefaultProfileImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultProfileImagePath;
  }

  protected readonly environment = environment;
}

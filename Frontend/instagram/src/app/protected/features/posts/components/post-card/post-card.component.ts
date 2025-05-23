import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../../../users/user.service";
import {PostService} from "../../post.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ImageService} from "../../../../../core/services/image.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {CommentData} from "./comments/models/comment.model";
import {ROUTE_PATHS} from "../../../../../core/constants/routes";
import {environment} from "../../../../../../env/env";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent{
  @Input()
  post!: Post;

  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  defaultPostImagePath: string = '/assets/default-post-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;
  postImageUrl: SafeUrl | string = this.defaultPostImagePath;

  areCommentsShowing: boolean = false;
  comments: CommentData[] = [];

  loggedUserId: string | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private authService: AuthService,
    private router: Router) {
    this.loggedUserId = authService.getId();
  }

  toggleComments(){
    this.areCommentsShowing = !this.areCommentsShowing;
  }

  getPostCreation(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
      return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
    } else if (hours < 24) {
      return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
    } else if (days < 7) {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    } else if (weeks < 4) {
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    } else if (months < 12) {
      return months === 1 ? '1 month ago' : `${months} months ago`;
    } else {
      return years === 1 ? '1 year ago' : `${years} years ago`;
    }
  }


  goToProfilePage() {
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.post.author.id]);
  }

  onCommentAdded(comment: CommentData) {
    this.comments.push(comment);
  }

  setDefaultPostImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultPostImagePath;
  }

  setDefaultProfileImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultProfileImagePath;
  }

  protected readonly environment = environment;
}

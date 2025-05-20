import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Post} from "../../models/post.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../../../users/user.service";
import {PostService} from "../../post.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ImageService} from "../../../shared/images/image.service";
import {AuthService} from "../../../auth/auth.service";
import {CommentData} from "../../comments/models/comment.model";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input()
  post!: Post;

  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  defaultPostImagePath: string = '/assets/default-post-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;
  postImageUrl: SafeUrl | string = this.defaultPostImagePath;

  areCommentsShowing: boolean = false;
  comments: CommentData[] = [];

  loggedUserId: string | undefined;

  // @Output() postDeleted = new EventEmitter<Post>();

  constructor(
    private sanitizer: DomSanitizer,
    private imageService: ImageService,
    private authService: AuthService) {
    this.loggedUserId = authService.getId();
  }

  ngOnInit() {
    this.loadPostImage();
    this.loadProfileImage();
  }

  toggleComments(){
    this.areCommentsShowing = !this.areCommentsShowing;
    if(this.areCommentsShowing){
      this.loadComments();
    }
  }


  loadPostImage() {
    if (this.post.image) {
      this.imageService.getImage(this.post.image.id).subscribe({
        next: (blob: Blob) => {
          const objectURL = URL.createObjectURL(blob);
          this.postImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        },
        error: (err) => {
          console.error('Error loading post image:', err);
          this.postImageUrl = this.defaultPostImagePath;
        }
      });
    } else {
      this.postImageUrl = this.defaultPostImagePath;
    }
  }

  loadComments() {

  }

  loadProfileImage() {
    if (this.post.author.profileImage) {
      this.imageService.getImage(this.post.author.profileImage.id).subscribe({
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

  }

  onCommentAdded(comment: CommentData) {
    this.comments.push(comment);
  }
}

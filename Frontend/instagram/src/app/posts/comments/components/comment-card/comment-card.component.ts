import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../models/post.model";
import {User} from "../../../../users/models/user.model";
import {DomSanitizer, SafeHtml, SafeUrl} from "@angular/platform-browser";
import {UserService} from "../../../../users/user.service";
import {CommentData} from "../../models/comment.model";
import {CommentService} from "../../comment.service";
import {ImageService} from "../../../../shared/images/image.service";

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.css'
})
export class CommentCardComponent implements OnInit{
  @Input() comment!: CommentData;
  @Input() post!: Post;
  @Input() level!: number;

  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;
  commentContent: SafeHtml | string = '';

  isReplyOpened: boolean = false;
  areRepliesShowing: boolean = false;

  replies: CommentData[] = [];

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private commentService: CommentService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.commentContent = this.sanitizer.bypassSecurityTrustHtml(this.comment.content);
    this.loadProfileImage();
  }

  loadProfileImage() {
    if (this.comment.author.profileImage) {
      this.imageService.getImage(this.comment.author.profileImage.id).subscribe({
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

  getCommentCreation(dateString: string): string {
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
    // this.router.navigate(['/profile', this.author.email]);
  }

  onReplyClicked(){
    this.isReplyOpened = !this.isReplyOpened;
  }

  onCommentAdded(comment: CommentData) {
    this.replies.push(comment);
    this.comment.replies.push(comment);
    this.areRepliesShowing = true;
    this.isReplyOpened = false;
  }

  onShowRepliesClicked(){
    this.areRepliesShowing = !this.areRepliesShowing;
    if(this.areRepliesShowing) {this.loadReplies();}
  }

  loadReplies() {
    this.commentService.getCommentsByParentCommentId(this.comment.id).subscribe({
      next: (response) => {
        this.replies = response;
      }
    })
  }
}

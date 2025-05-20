import {Component, inject, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../shared/images/image.service";
import {FollowService} from "../follow.service";
import {FollowRequest} from "../models/follow-request.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  loggedUser!: User;
  userId!: string | null;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileImageUrl: SafeUrl | string = this.defaultProfileImagePath;
  profileBackgroundImageUrl: string = "/assets/profile-background-v3.jpg";

  isFollowing: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private followService: FollowService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadUser();
    this.getLoggedUser();
  }


  loadUser(){
    if(this.userId)
    this.userService.getById(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
        this.loadProfileImage();
      }
    });
  }

  getLoggedUser(){
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.loggedUser = user;
        this.loadIsFollowing(this.loggedUser.id, user.id);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadIsFollowing(fromUserId: string, toUserId: string ){
    const followRequest: FollowRequest = {
      fromUserId: fromUserId,
      toUserId: toUserId,
    }
    this.followService.isFollowing(followRequest).subscribe({
      next: (isFollowing: boolean) => {
        this.isFollowing = isFollowing;
      }
    })
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

  onFollowClicked() {
    const followRequest: FollowRequest = {
      fromUserId: this.loggedUser.id,
      toUserId: this.user.id,
    }

    this.followService.followUser(followRequest).subscribe({
      next: () => {
        this.loadUser();
        console.log("Successfully followed user");
      }
    })
  }

  onUnfollowClicked() {
    const followRequest: FollowRequest = {
      fromUserId: this.loggedUser.id,
      toUserId: this.user.id,
    }

    this.followService.unfollowUser(followRequest).subscribe({
      next: () => {
        this.loadUser();
        console.log("Successfully unfollowed user");
      }
    })
  }


  openEditUserDialog() {
    // const dialogRef = this.dialog.open(EditUserDialogComponent, {
    //   data: {
    //     user: this.user,
    //   },
    //   // width: '90vw',
    //   maxWidth: '90vw',
    //   maxHeight: '90vh'
    // });
    //
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     if(this.userEmail)
    //       this.getUser(this.userEmail);
    //   }
    // });
  }
}

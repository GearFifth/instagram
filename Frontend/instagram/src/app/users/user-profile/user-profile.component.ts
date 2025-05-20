import {Component, inject, OnInit} from '@angular/core';
import {User} from "../models/user.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {AuthService} from "../../auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../shared/images/image.service";

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
  profileBackgroundImageUrl: string = "/assets/profile-background.jpg";

  readonly dialog = inject(MatDialog);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private imageService: ImageService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if(this.userId)
      this.loadUser(this.userId);
    this.getLoggedUser();
  }

  loadUser(id: string){
    this.userService.getById(id).subscribe({
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
      },
      error: (error) => {
        console.log(error);
      }
    });
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

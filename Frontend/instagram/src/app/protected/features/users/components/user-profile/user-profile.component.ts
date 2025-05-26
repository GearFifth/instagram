import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../user.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ImageService} from "../../../../../core/services/image.service";
import {FollowService} from "../../follow.service";
import {FollowRequest} from "../../models/follow-request.model";
import {Post} from "../../../posts/models/post.model";
import {Subscription} from "rxjs";
import {InfiniteScrollService} from "../../../../../core/services/infinite-scroll.service";
import {PostService} from "../../../posts/post.service";
import {EditUserDialogComponent} from "../edit-user-dialog/edit-user-dialog.component";
import {environment} from "../../../../../../env/env";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  providers: [InfiniteScrollService<Post>]
})
export class UserProfileComponent implements OnInit, OnDestroy {
  private _snackBar = inject(MatSnackBar);
  user!: User;
  loggedUser!: User;
  userId!: string;
  defaultProfileImagePath: string = '/assets/default-profile-image.png';
  profileBackgroundImageUrl: string = "/assets/profile-background-v3.jpg";
  isFollowing: boolean = false;

  readonly dialog = inject(MatDialog);

  // posts
  posts: Post[] = [];
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  isLoading: boolean = false;
  private loadingSubscription?: Subscription;
  private postsSubscription?: Subscription;
  itemsPerPage = 2;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private followService: FollowService,
    public infiniteScroll: InfiniteScrollService<Post>,
    public postService: PostService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id && id !== this.userId) {
        this.userId = id;
        this.loadUser();
        this.getLoggedUser();

        this.infiniteScroll.loadInitial((page, size) => this.postService.getPaginatedPostsForUserProfile(this.userId, page, size), this.itemsPerPage);
        this.postsSubscription = this.infiniteScroll.items$.subscribe(posts => this.posts = posts);
        this.loadingSubscription = this.infiniteScroll.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
      }
    });
  }

  ngOnDestroy() {
    // todo: collect all subscription into list, and foreach unsubscribe
    this.loadingSubscription?.unsubscribe();
    this.postsSubscription?.unsubscribe();
  }

  loadUser(){
    if(this.userId)
    this.userService.getById(this.userId).subscribe({
      next: (user: User) => {
        this.user = user;
      }
    });
  }

  getLoggedUser(){
    this.userService.getLoggedUser().subscribe({
      next: (user: User) => {
        this.loggedUser = user;
        this.loadIsFollowing(this.loggedUser.id, this.userId!);
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

  onFollowClicked() {
    const followRequest: FollowRequest = {
      fromUserId: this.loggedUser.id,
      toUserId: this.user.id,
    }

    this.followService.followUser(followRequest).subscribe({
      next: () => {
        this.loadUser();
        this.loadIsFollowing(this.loggedUser.id, this.user.id);
      },
      error: () => {
        this._snackBar.open("Error following user", "OK")
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
        this.loadIsFollowing(this.loggedUser.id, this.user.id);
      },
      error: () => {
        this._snackBar.open("Error unfollowing user", "OK")
      }
    })
  }

  onScroll = () => {
    this.infiniteScroll.loadMore((page, size) => this.postService.getPaginatedPostsForUserProfile(this.userId, page, size));
  }


  openEditUserDialog() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {
        user: this.user,
      },
      // width: '90vw',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.user = result;
        this.infiniteScroll.reset();
        this.infiniteScroll.loadInitial((page, size) => this.postService.getPaginatedPostsForUserProfile(this.userId, page, size), this.itemsPerPage);
      }
    });
  }

  setDefaultProfileImage(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultProfileImagePath;
  }

  protected readonly environment = environment;
}

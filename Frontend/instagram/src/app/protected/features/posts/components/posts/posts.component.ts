import {Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../create-post-dialog/create-post-dialog.component";
import {PostService} from "../../post.service";
import {Post} from "../../models/post.model";
import {Observable, Subscription} from "rxjs";
import {InfiniteScrollService} from "../../../../../core/services/infinite-scroll.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  providers: [InfiniteScrollService<Post>]
})
export class PostsComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  posts: Post[] = [];
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  isLoading: boolean = false;
  loggedUserId: string = '';
  private loadingSubscription?: Subscription;
  private postsSubscription?: Subscription;
  itemsPerPage = 2;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    public infiniteScroll: InfiniteScrollService<Post>) {
  }

  ngOnInit() {
    const loggedUserId = this.authService.getId();
    if (!loggedUserId) {
      console.error("User not logged in");
      return;
    }
    this.loggedUserId = loggedUserId;
    this.infiniteScroll.loadInitial((page, size) => this.postService.getPaginatedPostsForUserFeed(this.loggedUserId, page, size), this.itemsPerPage);
    this.postsSubscription = this.infiniteScroll.items$.subscribe(posts => this.posts = posts);
    this.loadingSubscription = this.infiniteScroll.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
    this.postsSubscription?.unsubscribe();
  }

  onScroll = () => {
    this.infiniteScroll.loadMore((page, size) => this.postService.getPaginatedPostsForUserFeed(this.loggedUserId, page, size));
  }

  scrollToTop() {
    if (this.contentDiv) {
      this.contentDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openCreatePostDialog() {
    const dialogRef = this.dialog.open(CreatePostDialogComponent, {
      data: {
        loggedUserId: this.authService.getId()
      },
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '90vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.infiniteScroll.reset();
        this.infiniteScroll.loadInitial((page, size) => this.postService.getPaginatedPostsForUserFeed(this.loggedUserId, page, size), this.itemsPerPage);
        this.scrollToTop();
      }
    });
  }
}

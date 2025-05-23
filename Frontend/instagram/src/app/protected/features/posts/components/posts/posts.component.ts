import {AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
export class PostsComponent implements OnInit, OnDestroy, AfterViewInit{
  readonly dialog = inject(MatDialog);
  posts: Post[] = [];
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  isLoading: boolean = false;
  loggedUserId: string = '';
  private loadingSubscription?: Subscription;
  private postsSubscription?: Subscription;
  itemsPerPage = 2;

  @ViewChild('wrapperDiv') wrapperDiv!: ElementRef;
  @ViewChild('windowBox') windowBox!: ElementRef;
  shouldCenter = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    public infiniteScroll: InfiniteScrollService<Post>) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfShouldCenter());
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

  checkIfShouldCenter(): void {
    const wrapperHeight = this.wrapperDiv.nativeElement.scrollHeight;
    const containerHeight = this.windowBox.nativeElement.clientHeight;

    this.shouldCenter = wrapperHeight <= containerHeight;
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
      width: '50vw',
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

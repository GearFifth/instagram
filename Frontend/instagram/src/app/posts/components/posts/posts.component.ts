import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../create-post-dialog/create-post-dialog.component";
import {PostService} from "../../post.service";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  posts: Post[] = [];
  @ViewChild('contentDiv') contentDiv!: ElementRef;
  @Input() userId: string | null = null;

  constructor(private authService: AuthService, private postService: PostService) {
  }

  ngOnInit() {
    this.loadPosts();
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
        this.posts.push(result);
        this.currentPage = 0;
        this.loadPosts();
        this.scrollToTop();
      }
    });
  }

  // INFINITE SCROLL
  isLoading = false;
  currentPage = 0;
  itemsPerPage = 2;

  toggleLoading = () => this.isLoading = !this.isLoading;

  getPostFetcher(): (page: number, size: number) => Observable<Post[]> {
    if (this.userId) {
      return (page: number, size: number) =>
        this.postService.getPaginatedPostsForUserProfile(this.userId!, page, size);
    } else {
      return (page: number, size: number) => {
        const loggedUserId = this.authService.getId();
        if (!loggedUserId) {
          throw new Error("User is not logged in.");
        }
        return this.postService.getPaginatedPostsForUserFeed(loggedUserId, page, size);
      };
    }
  }

  loadPosts = () => {
    this.toggleLoading();
    const fetchPosts = this.getPostFetcher();
    fetchPosts(this.currentPage, this.itemsPerPage).subscribe({
      next: (posts: Post[]) => {
        this.posts = posts;
        console.log(this.posts);
      },
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }

  appendPosts = () => {
    this.toggleLoading();
    const fetchPosts = this.getPostFetcher();
    fetchPosts(this.currentPage, this.itemsPerPage).subscribe({
      next: (posts: Post[]) => {
        this.posts = [...this.posts, ...posts];
      },
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    });
  }

  onScroll = () => {
    console.log("scroll");
    this.currentPage++;
    this.appendPosts();
  }

}

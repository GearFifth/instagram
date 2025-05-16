import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import {MatDialog} from "@angular/material/dialog";
import {CreatePostDialogComponent} from "../create-post-dialog/create-post-dialog.component";
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    // this.loadData();
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
        // this.currentPage = 0;
        // this.loadData();
        // this.scrollToTop();
      }
    });
  }
}

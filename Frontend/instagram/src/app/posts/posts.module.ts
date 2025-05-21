import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { PostsRoutingModule} from "./posts-routing.module";
import {MatButton} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import {FormsModule} from "@angular/forms";
import { PostCardComponent } from './components/post-card/post-card.component';
import { ReactionsComponent } from './components/reactions/reactions.component';
import { CommentCardComponent } from './comments/components/comment-card/comment-card.component';
import { AddCommentComponent } from './comments/components/add-comment/add-comment.component';
import { CommentsComponent } from './comments/components/comments/comments.component';
import { CommentListComponent } from './comments/components/comment-list/comment-list.component';
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import { PostCardsComponent } from './components/post-cards/post-cards.component';



@NgModule({
  declarations: [
    PostsComponent,
    CreatePostDialogComponent,
    PostCardComponent,
    ReactionsComponent,
    CommentCardComponent,
    AddCommentComponent,
    CommentsComponent,
    CommentListComponent,
    PostCardsComponent
  ],
  exports: [
    PostsComponent,
    PostCardsComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    FormsModule,
    InfiniteScrollDirective
  ]
})
export class PostsModule { }

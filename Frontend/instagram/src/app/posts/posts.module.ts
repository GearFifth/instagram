import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './components/posts/posts.component';
import { PostsRoutingModule} from "./posts-routing.module";
import {MatButton} from "@angular/material/button";
import {SharedModule} from "../shared/shared.module";
import { CreatePostDialogComponent } from './components/create-post-dialog/create-post-dialog.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    PostsComponent,
    CreatePostDialogComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class PostsModule { }

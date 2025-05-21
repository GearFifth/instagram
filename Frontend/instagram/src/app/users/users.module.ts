import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {SharedModule} from "../shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";
import {PostsModule} from "../posts/posts.module";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    PostsModule,
    InfiniteScrollDirective
  ]

})
export class UsersModule { }

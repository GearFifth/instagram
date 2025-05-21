import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {SharedModule} from "../shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";
import {PostsModule} from "../posts/posts.module";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {UserSearchBarComponent} from "./user-search-bar/user-search-bar.component";
import {FormsModule} from "@angular/forms";
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserSearchBarComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    PostsModule,
    InfiniteScrollDirective,
    FormsModule
  ]

})
export class UsersModule { }

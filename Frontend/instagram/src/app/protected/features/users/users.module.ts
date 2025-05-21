import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {SharedModule} from "../../../shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";
import {PostsModule} from "../posts/posts.module";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {UserSearchBarComponent} from "./components/user-search-bar/user-search-bar.component";
import {FormsModule} from "@angular/forms";
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserCardComponent,
    UserSearchBarComponent
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    UsersRoutingModule,
    InfiniteScrollDirective,
    FormsModule,
    PostsModule
  ]

})
export class UsersModule { }

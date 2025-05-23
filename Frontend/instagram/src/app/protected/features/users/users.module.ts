import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {SharedModule} from "../../../shared/shared.module";
import {UsersRoutingModule} from "./users-routing.module";
import {PostsModule} from "../posts/posts.module";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {UserSearchBarComponent} from "./components/user-search-bar/user-search-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserCardComponent } from './components/user-card/user-card.component';
import { DiscoverUsersComponent } from './components/discover-users/discover-users.component';
import { UserRecommendationCardComponent } from './components/discover-users/user-recommendation-card/user-recommendation-card.component';
import { UserRecommendationCardsComponent } from './components/discover-users/user-recommendation-cards/user-recommendation-cards.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserCardComponent,
    UserSearchBarComponent,
    DiscoverUsersComponent,
    UserRecommendationCardComponent,
    UserRecommendationCardsComponent,
    EditUserDialogComponent,
    UserSettingsComponent,
    ChangePasswordDialogComponent
  ],
  exports: [
    UserSearchBarComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        UsersRoutingModule,
        InfiniteScrollDirective,
        FormsModule,
        PostsModule,
        ReactiveFormsModule
    ]

})
export class UsersModule { }

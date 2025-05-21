import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProtectedRoutingModule} from "./protected-routing.module";
import {PostsModule} from "./features/posts/posts.module";
import {UsersModule} from "./features/users/users.module";
import {NavbarComponent} from "./navbar/components/navbar/navbar.component";
import {UserNavbarComponent} from "./navbar/components/user-navbar/user-navbar.component";
import {AdminNavbarComponent} from "./navbar/components/admin-navbar/admin-navbar.component";
import { ProtectedLayoutComponent } from './protected-layout/protected-layout.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    NavbarComponent,
    UserNavbarComponent,
    AdminNavbarComponent,
    ProtectedLayoutComponent
  ],
  imports: [
    CommonModule,
    ProtectedRoutingModule,
    PostsModule,
    UsersModule,
    SharedModule,
  ]
})
export class ProtectedModule { }

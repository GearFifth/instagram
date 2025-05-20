
import {ROUTE_PATHS} from "../shared/constants/routes";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";

import {NgModule} from "@angular/core";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: "profile/:id", component: UserProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

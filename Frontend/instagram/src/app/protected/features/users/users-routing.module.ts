
import {ROUTE_PATHS} from "../../../core/constants/routes";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../../../core/guards/auth.guard";

import {NgModule} from "@angular/core";
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {DiscoverUsersComponent} from "./components/discover-users/discover-users.component";
import {UserSettingsComponent} from "./components/user-settings/user-settings.component";

const routes: Routes = [
  { path: "profile/:id", component: UserProfileComponent},
  { path: "discover-people", component: DiscoverUsersComponent},
  { path: "settings", component: UserSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}

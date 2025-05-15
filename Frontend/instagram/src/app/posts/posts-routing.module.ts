
import {ROUTE_PATHS} from "../shared/constants/routes";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/guards/auth.guard";
import {PostsComponent} from "./components/posts/posts.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: "", component: PostsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}

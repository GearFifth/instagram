import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {NgModule} from "@angular/core";
import {ProtectedLayoutComponent} from "./protected-layout/protected-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ProtectedLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'posts',
        loadChildren: () => import('./features/posts/posts.module').then(m => m.PostsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./features/chat/chat.module').then(m => m.ChatModule) },
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule {}

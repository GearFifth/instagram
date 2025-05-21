import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";

// const routes: Routes = [
//   { path: 'auth', loadChildren: () => import('./public/auth/auth.module').then(m => m.AuthModule) },
//   { path: 'posts', loadChildren: () => import('./protected/features/posts/posts.module').then(m => m.PostsModule), canActivate: [AuthGuard] },
//   { path: 'users', loadChildren: () => import('./protected/features/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard] },
//   { path: '**', redirectTo: '/auth/login' }
// ];

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: '',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login' // fallback to login
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

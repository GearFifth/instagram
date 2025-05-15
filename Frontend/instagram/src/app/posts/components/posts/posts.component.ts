import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent {
  constructor(private authService: AuthService) {
  }

  onLogoutClicked(): void {
    this.authService.logout().subscribe();
  }
}

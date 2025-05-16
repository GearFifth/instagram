import {Component, Input} from '@angular/core';
import {User} from "../../../users/models/user.model";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {ROUTE_PATHS} from "../../constants/routes";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrl: './user-navbar.component.css'
})
export class UserNavbarComponent {
  protected readonly ROUTE_PATHS = ROUTE_PATHS;
  @Input() loggedUser!: User;

  constructor(
    private authService: AuthService,
    private router: Router) {}


  logout() {
    this.authService.logout().subscribe();
  }

  openSettingsPage() {
    // this.router.navigate(['/settings', this.loggedUser.email]);
  }

  goToProfilePage() {
    // this.router.navigate(['/profile', this.loggedUser.email]);
  }

  goToPostsPage() {
    this.router.navigate([ROUTE_PATHS.POSTS_ROOT]);
  }
}

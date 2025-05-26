import {Component, Input} from '@angular/core';
import {User} from "../../../features/users/models/user.model";
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {ROUTE_PATHS} from "../../../../core/constants/routes";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  protected readonly ROUTE_PATHS = ROUTE_PATHS;
  @Input() loggedUser!: User;

  constructor(
    private authService: AuthService,
    private router: Router) {}

  logout() {
    this.authService.logout().subscribe();
  }

  openSettingsPage() {
    this.router.navigate([ROUTE_PATHS.USER_SETTINGS]);
  }

  goToProfilePage() {
    this.router.navigate([ROUTE_PATHS.USER_PROFILE, this.loggedUser.id]);
  }

  goToPostsPage() {
    this.router.navigate([ROUTE_PATHS.POSTS]);
  }

  goToDiscoverPeoplePage() {
    this.router.navigate([ROUTE_PATHS.DISCOVER_PEOPLE]);
  }
}

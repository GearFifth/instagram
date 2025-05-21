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
  readonly ROUTE_PATHS = ROUTE_PATHS;
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

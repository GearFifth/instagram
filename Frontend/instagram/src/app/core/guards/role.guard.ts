import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {UserRole} from "../../protected/features/users/models/user-role.enum";
import {ROUTE_PATHS} from "../constants/routes";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getRole();
    const requiredRoles = route.data['roles'] as UserRole[];

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate([ROUTE_PATHS.POSTS_ROOT]);
      return false;
    }

    return true;
  }
}

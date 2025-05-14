import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {UserRole} from "../models/user-role.enum";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getRole();
    const requiredRoles = route.data['roles'] as UserRole[];

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      this.router.navigate(['/posts']);
      return false;
    }

    return true;
  }
}

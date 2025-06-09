import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {ROUTE_PATHS} from "../constants/routes";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isLogged = this.authService.isLoggedIn();
    if (!isLogged) this.router.navigate([ROUTE_PATHS.AUTH_LOGIN]);
    return isLogged;
  }
}

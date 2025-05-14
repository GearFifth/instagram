import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, tap} from "rxjs";
import {UserRole} from "./models/user-role.enum";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterRequest} from "./models/register-request.model";
import {LoginRequest} from "./models/login-request.model";
import {AuthResponse} from "./models/auth-response.model";
import {environment} from "../env/env";
import {JwtHelperService} from "@auth0/angular-jwt";
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleSubject = new BehaviorSubject<UserRole>(UserRole.UNAUTHORIZED);
  role$ = this.roleSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {}

  register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(`${environment.apiHost}auth/register`, registerRequest);
  }

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${environment.apiHost}auth/login`, loginRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      tap((response: AuthResponse) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('user', response.accessToken);
          this.setRoleFromJwt(response.accessToken);
        }
      }),
      map(() => void 0),
      catchError((error) => {
        throw error;
      })
    );
  }

  logout(): Observable<string> {
    return this.http.post(`${environment.apiHost}auth/logout`,{}, {
      responseType: 'text',
    }).pipe(
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('user');
          this.roleSubject.next(UserRole.UNAUTHORIZED);
          this.router.navigate(['/auth/login']);
        }
      }),
      catchError((error) => {
        throw error;
      })
    );
  }

  private setRoleFromJwt(jwt: string): void {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(jwt);
    const roleArray = decodedToken.role;
    const role = Array.isArray(roleArray) && roleArray.length > 0
      ? roleArray[0].authority
      : UserRole.UNAUTHORIZED;

    this.roleSubject.next(role as UserRole);
  }

  getRole(): UserRole {
    return this.roleSubject.value;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user');
    }
    return null;
  }

  getId(): string | undefined{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken)["id"];
    }
    return undefined;
  }

  getExpiration(): number | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('user');
      if (token) {
        const helper = new JwtHelperService();
        const expiration = helper.decodeToken(token)["exp"];
        return expiration ? +expiration : undefined;
      }
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return !!token && !helper.isTokenExpired(token);
    }
    return false;
  }

  checkEmailUniqueness(){
    //TODO
  }
}

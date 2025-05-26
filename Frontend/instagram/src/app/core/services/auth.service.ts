import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, switchMap, tap} from "rxjs";
import {UserRole} from "../../protected/features/users/models/user-role.enum";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterRequest} from "../models/register-request.model";
import {LoginRequest} from "../models/login-request.model";
import {AuthResponse} from "../models/auth-response.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {isPlatformBrowser} from "@angular/common";
import {ROUTE_PATHS} from "../constants/routes";
import {ChangePasswordRequest} from "../models/change-password-request.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  roleSubject = new BehaviorSubject<UserRole>(UserRole.UNAUTHORIZED);
  private readonly apiUrl = 'auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.loadRoleFromLocalStorage();
  }

  private loadRoleFromLocalStorage(): void {
    const token = this.getToken();
    if (token) {
      this.setRoleFromJwt(token);
    }
  }

  header = new HttpHeaders({
    'Content-Type': 'application/json',
  })

  register(registerRequest: RegisterRequest): Observable<any> {
    const formData = new FormData();

    const userBlob = new Blob([JSON.stringify({
      email: registerRequest.email,
      password: registerRequest.password,
      firstName: registerRequest.firstName,
      lastName: registerRequest.lastName,
      address: registerRequest.address,
      phoneNumber: registerRequest.phoneNumber
    })], { type: 'application/json' });

    formData.append('user', userBlob);

    if (registerRequest.profileImage) {
      formData.append('profileImage', registerRequest.profileImage);
    }

    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  login(loginRequest: LoginRequest): Observable<void> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginRequest, {
      headers: this.header,
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

  cleanLocalStorage(){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      this.roleSubject.next(UserRole.UNAUTHORIZED);
      this.router.navigate([ROUTE_PATHS.AUTH_LOGIN]);
    }
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem('user');
          this.roleSubject.next(UserRole.UNAUTHORIZED);
          this.router.navigate([ROUTE_PATHS.AUTH_LOGIN]);
        }
      }),
      catchError((error) => {
        console.error("Logout Error:", error);
        return new Observable<void>();
      })
    );
  }

  changePassword(request: ChangePasswordRequest) : Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/change-password`, request)
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

  getTokenExpiration(token: string): number | undefined {
    const helper = new JwtHelperService();
    return helper.decodeToken(token)?.exp;
  }

  isTokenExpired(token: string): boolean {
    const expiration = this.getTokenExpiration(token);
    if (!expiration) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return expiration < now;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token ? !this.isTokenExpired(token) : false;
  }

  verifyEmail(token: string): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/verify-email?token=${token}`);
  }
}

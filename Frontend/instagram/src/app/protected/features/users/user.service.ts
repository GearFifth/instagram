import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {environment} from "../../../../env/env";
import {User} from "./models/user.model";
import {AuthService} from "../../../core/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http.get<boolean>("users/check-email", {
      params: { email }
    });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }

  getLoggedUser(): Observable<User> {
    const id = this.authService.getId();
    return id ? this.getById(id) : throwError(() => new Error('No logged in user'));
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`users/search?query=${encodeURIComponent(query)}`);
  }
}

// todo: use all url routes to constants

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap, throwError} from "rxjs";
import {environment} from "../../../../env/env";
import {User} from "./models/user.model";
import {AuthService} from "../../../core/services/auth.service";
import {UpdateUserRequest} from "./models/update-user-request.model";
import {RegisterRequest} from "../../../core/models/register-request.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'users';

  constructor(private http: HttpClient, private authService: AuthService) {}

  checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-email`, {
      params: { email }
    });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getLoggedUser(): Observable<User> {
    const id = this.authService.getId();
    return id ? this.getById(id) : throwError(() => new Error('No logged in user'));
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?query=${encodeURIComponent(query)}`);
  }

  update(request: UpdateUserRequest) : Observable<User> {
    const formData = new FormData();

    const userBlob = new Blob([JSON.stringify({
      id: request.id,
      firstName: request.firstName,
      lastName: request.lastName,
      address: request.address,
      phoneNumber: request.phoneNumber
    })], { type: 'application/json' });

    formData.append('user', userBlob);

    if (request.profileImage) {
      formData.append('profileImage', request.profileImage);
    }

    return this.http.put<User>(`${this.apiUrl}`, formData);
  }

  remove(userId: string) : Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}`);
  }
}

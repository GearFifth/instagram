import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../env/env";
import {User} from "./models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  checkEmailUniqueness(email: string): Observable<boolean> {
    return this.http.get<boolean>("users/check-email", {
      params: { email }
    });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`users/${id}`);
  }
}

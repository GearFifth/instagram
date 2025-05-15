import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../env/env";

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
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FollowRequest} from "./models/follow-request.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  private readonly apiUrl = 'follow';

  constructor(private http: HttpClient) {}

  followUser(request: FollowRequest): Observable<void> {
    return this.http.post<void>(this.apiUrl, request);
  }

  unfollowUser(request: FollowRequest): Observable<void> {
    return this.http.delete<void>(this.apiUrl, {
      body: request,
    });
  }

  isFollowing(request: FollowRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/is-following`, request);
  }
}

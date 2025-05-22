import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "../posts/models/post.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "./models/user.model";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private http: HttpClient) { }

  getPaginatedRecommendedUsers(page: number = 1, itemsPerPage: number = 10): Observable<User[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<User[]>(`recommendations/users`, { params });
  }

}

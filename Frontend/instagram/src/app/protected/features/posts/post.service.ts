import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePostRequest} from "../../../core/models/create-post-request.model";
import {Post} from "./models/post.model";
import {Reaction} from "./models/reaction.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly apiUrl = 'posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  createPost(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}`, request);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }


  addReaction(postId: string, reaction: Reaction): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${postId}/reactions`, reaction);
  }

  removeReaction(postId: string, reaction: Reaction): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${postId}/reactions`, { body: reaction });
  }


  getPaginatedPostsForUserFeed(userId: string, page: number = 1, itemsPerPage: number = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Post[]>(`${this.apiUrl}/feed/user/${userId}`, { params });
  }

  getPaginatedPostsForUserProfile(userId: string, page: number = 1, itemsPerPage: number = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`, { params });
  }
}

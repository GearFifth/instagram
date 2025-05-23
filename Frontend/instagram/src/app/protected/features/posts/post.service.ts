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

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`posts`);
  }

  createPost(request: CreatePostRequest): Observable<Post> {
    return this.http.post<Post>("posts", request);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`posts/${id}`);
  }


  addReaction(postId: string, reaction: Reaction): Observable<void> {
    return this.http.post<void>(`posts/${postId}/reactions`, reaction);
  }

  removeReaction(postId: string, reaction: Reaction): Observable<void> {
    return this.http.delete<void>(`posts/${postId}/reactions`, { body: reaction });
  }


  getPaginatedPostsForUserFeed(userId: string, page: number = 1, itemsPerPage: number = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Post[]>(`posts/feed/user/${userId}`, { params });
  }

  getPaginatedPostsForUserProfile(userId: string, page: number = 1, itemsPerPage: number = 10): Observable<Post[]> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('itemsPerPage', itemsPerPage.toString());

    return this.http.get<Post[]>(`posts/user/${userId}`, { params });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePostRequest} from "../../../core/models/create-post-request.model";
import {Post} from "./models/post.model";
import {Reaction} from "./models/reaction.model";
import {RegisterRequest} from "../../../core/models/register-request.model";

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
    const formData = new FormData();

    const postBlob = new Blob([JSON.stringify({
      description: request.description,
      authorId: request.authorId,
    })], { type: 'application/json' });

    formData.append('post', postBlob);

    if (request.image) {
      formData.append('image', request.image);
    }

    return this.http.post<Post>(`${this.apiUrl}`, formData);
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

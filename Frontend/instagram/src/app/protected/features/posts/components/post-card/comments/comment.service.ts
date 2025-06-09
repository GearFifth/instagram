import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateCommentRequestModel} from "./models/create-comment-request.model";
import {CommentData} from "./models/comment.model";
import {UpdateCommentRequest} from "./models/update-comment-request.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = `comments`;

  constructor(private http: HttpClient) {}

  getComments(): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(this.apiUrl);
  }

  get(commentId: string): Observable<CommentData> {
    return this.http.get<CommentData>(`${this.apiUrl}/${commentId}`);
  }

  create(request: CreateCommentRequestModel): Observable<CommentData> {
    return this.http.post<CommentData>(this.apiUrl, request);
  }

  update(request: UpdateCommentRequest): Observable<CommentData> {
    return this.http.put<CommentData>(this.apiUrl, request);
  }

  remove(commentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }

  getCommentsByPostId(postId: string): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(`${this.apiUrl}/post/${postId}`);
  }

  getCommentsByParentCommentId(parentCommentId: string): Observable<CommentData[]> {
    return this.http.get<CommentData[]>(`${this.apiUrl}/parent/${parentCommentId}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreatePostRequest} from "./models/create-post-request.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {}

  createPost(request: CreatePostRequest): Observable<any> {
    return this.http.post("posts", request);
  }
}

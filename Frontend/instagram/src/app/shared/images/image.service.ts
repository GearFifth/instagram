import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ImageDetails} from "./image-details.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(file: File, relativePath?: string): Observable<ImageDetails> {
    const formData = new FormData();
    formData.append('file', file);
    if(relativePath) formData.append('relativePath', relativePath);
    return this.http.post<ImageDetails>("images/upload", formData);
  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ImageDetails} from "../../shared/models/image-details.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private readonly apiUrl = 'images';

  constructor(private http: HttpClient) {}

  uploadImage(file: File, relativePath?: string): Observable<ImageDetails> {
    const formData = new FormData();
    formData.append('file', file);
    if(relativePath) formData.append('relativePath', relativePath);
    return this.http.post<ImageDetails>(`${this.apiUrl}/upload`, formData);
  }

  getImage(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      responseType: 'blob'
    });
  }
}

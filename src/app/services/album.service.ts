import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Album } from "../models/album";
import { Photo } from "../models/photo";
@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getAll(userId: number) {
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/albums')
    .pipe(
      map( response => response.filter( post => {
        return post.userId === userId
    })));
  }
  getById(albumId: string) {
    let url = 'https://jsonplaceholder.typicode.com/albums/?id=' + albumId
    return this.http.get<Album>(url);      
  }
  getPhotos(albumId: string) {
    let url = 'https://jsonplaceholder.typicode.com/photos/?albumId=' + albumId;
    return this.http.get<Photo[]>(url);
  }
}

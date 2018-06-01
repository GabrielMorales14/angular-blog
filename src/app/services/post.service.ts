import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from '../models/post';
import { Comment } from "../models/comment";
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) { }

  getAll(userId: number) {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .pipe(
      map( response => response.filter( post => {
        return post.userId === userId
    })));
  }
  getById(postId: string) {
    let url = 'https://jsonplaceholder.typicode.com/posts/?id=' + postId
    return this.http.get<Post>(url);      
  }
  addPost(post:any) {
    return this.http.post('https://jsonplaceholder.typicode.com/posts/', post);
  }
  getComments(postId: string) {
    let url = 'https://jsonplaceholder.typicode.com/comments/?postId=' + postId;
    return this.http.get<Comment[]>(url);
  }
}

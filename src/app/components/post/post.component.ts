import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from "../../services/post.service";
import { Post } from "../../models/post";
import { Comment } from "../../models/comment";

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  p:Post;
  comments:Comment[];
  id:string;
  constructor(private postservice:PostService, private route: ActivatedRoute,) {      
    this.id = route.snapshot.paramMap.get('id');    
   }

  ngOnInit() {    
    this.postservice.getById(this.id).subscribe(post => {      
      this.p = post;
    }); 

    this.postservice.getComments(this.id).subscribe( comment => {
      this.comments = comment;
    });
  }

}

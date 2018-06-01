import { Component, OnInit } from '@angular/core';
import { Router,  NavigationExtras,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { PostService } from "../../services/post.service";
import { User } from '../../models/user';
import { Post } from "../../models/post";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginService, PostService]
})
export class HomeComponent implements OnInit {    
  user:User;
  post:any;
  posts:Post[];
  pForm:FormGroup;
  constructor(
    private authenticationservice:LoginService,
    private fb: FormBuilder,
    private postservice:PostService, 
    public router: Router) { 
      this.pForm = fb.group({
        'title' : [null, Validators.required],
        'body' : [null, Validators.required],
      });
    }

  ngOnInit() {   
    /** Next time make an UserService to get the current User and import in app.module **/ 
    this.user = JSON.parse(localStorage.getItem('currentUser'));        
    this.postservice.getAll(this.user.id).subscribe( res => {
      this.posts = res;
    })
  }
  
  addPost(post) {
    let newPost = {      
      title:post['title'],
      body:post['body'],
      userId:this.user.id
    }
    this.postservice.addPost(newPost).subscribe((p:Post) => {
      this.posts.push(p);
    });
  }

  logout() {    
    this.authenticationservice.logout();
    this.router.navigate(['/']);
  }
}

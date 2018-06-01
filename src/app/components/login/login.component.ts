import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router,  NavigationExtras,ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})

export class LoginComponent implements OnInit {
  @ViewChild('username') el:ElementRef;
  statuslogin:any;
  focusin: boolean = true;
  rForm: FormGroup;
  post:any;  
  emailAlert:string="Please fill email";
  passwordAlert:string="Please fill password";
  loginAlert:string;
  loginError:boolean=false;
  returnUrl: string; 
  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private authenticationservice:LoginService,    
      public router: Router
    ) {
    this.rForm = fb.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
   }
   ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/Home']);
    }        
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/Home';
  }

  addPost(post) {

   this.authenticationservice.login(post).subscribe(
      res => {
        if(localStorage.getItem('currentUser')) {
            this.router.navigate([this.returnUrl]);
          }else{
            this.loginError = true
            this.loginAlert = res.error;
          }
      },
       err => {
        return err;          
      }
    );

  }

}
	




import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService as AGS }  from './services/auth-guard.service';
import { PhotoComponent } from './components/photo/photo.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent, },
  { path: 'Home', component: HomeComponent, canActivate: [AGS],
  children: [
      { path: '', redirectTo: 'Login', pathMatch: 'full' },      
    ] 
  },
  { path: 'About', component: AboutComponent, canActivate: [AGS] },
  { path: 'Gallery', component: GalleryComponent, canActivate: [AGS] },
  { path: 'Post/:id', component: PostComponent, canActivate: [AGS] },
  { path: 'Photos/:id', component: PhotoComponent, canActivate: [AGS] },
  { path: '**', redirectTo: '/Login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

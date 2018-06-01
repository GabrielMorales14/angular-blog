import { Component, OnInit } from '@angular/core';
import { AlbumService } from "../../services/album.service";
import { User } from "../../models/user";
import { Album } from '../../models/album';
import { hoverdir } from "../../../js/jquery.hoverdir.js";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  user:User;
  albums:Album[];
  constructor(private service:AlbumService) { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.service.getAll(this.user.id).subscribe(res => {
      this.albums = res;
    });
  }

}

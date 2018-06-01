import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../../services/album.service';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],
  providers: [AlbumService]
})
export class PhotoComponent implements OnInit {
  id:string;
  photos:Photo[];
  constructor(private route: ActivatedRoute, private service: AlbumService) {
    this.id = route.snapshot.paramMap.get('id');    
   }

  ngOnInit() {
    this.service.getPhotos(this.id).subscribe(res => {      
      this.photos = res;
    });    
    console.log(this.photos);
  }

}

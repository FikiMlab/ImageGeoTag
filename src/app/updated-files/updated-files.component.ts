import { ApiService } from './../api.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Image } from '../../../backend/models/image.js';

@Component({
  selector: 'app-updated-files',
  templateUrl: './updated-files.component.html',
  styleUrls: ['./updated-files.component.css']
})
export class UpdatedFilesComponent implements OnInit {

  images: Image = <Image>[];

  constructor(private apiService: ApiService) {

  }

  ngOnInit() {
    this.apiService.getImages().subscribe(res => {
      res.map(array => {
        array.arrayImages.map(item => {
          this.images.push(new Object({'name': item.name, 'path': item.path, 'lat': item.lat, 'lon': item.lon}));
        });
      });
    });
  }
}

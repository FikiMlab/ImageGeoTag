import { ApiService } from './../api.service';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Image } from '../../../backend/models/image';
import { Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-updated-files',
  templateUrl: './updated-files.component.html',
  styleUrls: ['./updated-files.component.css']
})

export class UpdatedFilesComponent implements OnInit {

  images: Image = <Image>[];
  coordinates: { 'lat': number, 'lon': number } = { 'lat': 0, 'lon': 0 };
  aha: any;
  constructor(private apiService: ApiService, public _DomSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.apiService.getImages().subscribe(res => {
      res.map(array => {
        array.arrayImages.map(item => {
          this.images.push(new Object({
            'name': item.name, 'path': item.path, 'img': item.img, 'lat': item.lat, 'lon': item.lon
          }));
        });
      });
    });
    if (this.images.length > 0) {
      console.log(this.coordinates);
      this.setCenter();
    }
  }

  setCenter() {
    let centerLat = 0;
    let centerLon = 0;
    for (let i = 0; i < this.images.length; i++) {
      centerLat += this.images[i].lat;
      centerLon += this.images[i].lon;
      console.log(this.images[i].lat);
      console.log(this.images[i].lon);
    }
    this.coordinates.lat = centerLat / (this.images.length);
    this.coordinates.lon = centerLon / (this.images.length);
    console.log(this.coordinates);
  }

  showImage(infoWindow, image) {
    /* if (image.lastOpen && image.lastOpen.isOpen) {
      image.lastOpen.close();
    }
    */
    image.lastOpen = infoWindow;
    infoWindow.open();
  }

  hideImage(infoWindow, image) {
    image.lastOpen = infoWindow;
    infoWindow.close();
  }

  showImages(data) {
    console.log(data);
  }

}

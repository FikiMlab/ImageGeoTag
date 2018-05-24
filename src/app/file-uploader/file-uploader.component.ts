import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  files: File[];
  getFiles(event) {
    this.files = <File[]>event.target.files;
    console.log(this.files);
  }

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  uploadImages() {
    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('image', this.files[i]);
    }
    this.apiService.addImage(formData);
    console.log('API successfull uploaded');
  }

  getImages() {
    this.apiService.getImages();
  }
}

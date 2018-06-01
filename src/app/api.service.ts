import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Image } from '../../backend/models/image.js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<Image> {
    const arrayImages = this.http.get('http://localhost:3000/images');
    return arrayImages;
  }

  loginUser(user) {
    this.http.get('http://localhost:3000/login').subscribe(res => {
      console.log(res);
    });
  }

  registerUser(user) {
    this.http.post('http://localhost:3000/register', user).subscribe(res => {
      console.log(res);
    });
  }

  uploadImage(image: FormData) {
    this.http.post('http://localhost:3000/uploadImage', image).subscribe(res => {
      console.log(res);
    });
  }

}

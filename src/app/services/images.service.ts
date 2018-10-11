import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Imagen } from '../models/image';

@Injectable({providedIn: 'root'})
export class ImagesService {
  private images: Imagen[] = [];
  private imagesUpdated = new Subject<{ images: Imagen[]; imageCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getImages(imagesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${imagesPerPage}&page=${currentPage}`;
    this.http.get<{message: string, images: any, maxImages: number}>(
      'http://localhost:3000/api/images' + queryParams
    )
    .pipe(
        map(imageData => {
        return {
          images: imageData.images.map(image => {
          return {
            name: image.name,
            createdDate : image.createdDate,
            url: image.url,
            id: image._id
          };
        }),
        maxIamges: imageData.images
        };
      })
    )
    .subscribe((tranformedImage) => {
      this.images = tranformedImage.images;
      this.imagesUpdated.next({
        images: [...this.images],
        imageCount: tranformedImage.maxIamges
      });
    });
  }

  getImagesUpdatedListener() {
    return this.imagesUpdated.asObservable();
  }

  addImage(name: string, createdDate: string, url: File) {
    const imageData = new FormData();
    imageData.append('name', name);
    imageData.append('createdDate', createdDate);
    imageData.append('url', url, name);
    this.http
      .post<{ message: string; image: Imagen }>(
        'http://localhost:3000/api/images',
        imageData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
      });
  }

  // addImage(name: string, createdDate: string, url: string) {
  //   const image: Imagen = {id: null, name: name, createdDate: createdDate, url: url };
  //   this.http.post<{message: string, imageId: string}>('http://localhost:3000/api/images', image)
  //   .subscribe( responseData => {
  //     console.log(responseData.imageId);
  //     const id = responseData.imageId;
  //     image.id = id;
  //     this.images.push(image);
  //     this.imagesUpdated.next([...this.images]);
  //   });
  // }

  getImageUpdateListener() {
    return this.imagesUpdated.asObservable();
  }

  getImage(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      createdDate: string;
      url: string;
    }>('http://localhost:3000/api/images/' + id);
  }

  deleteImage(imageId: string) {
    return this.http
      .delete('http://localhost:3000/api/images/' + imageId);
  }
}

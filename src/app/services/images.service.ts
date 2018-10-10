import { Injectable } from '@angular/core';
import { Imagen } from '../models/image';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ImagesService {
  private images: Imagen[] = [];
  private imagesUpdated = new Subject<Imagen[]>();

  constructor (private http: HttpClient) {}

  getImages() {
    this.http.get<{message: string, images: any}>(
      'http://localhost:3000/api/images'
    )
    .pipe(map((imageData) => {
      return imageData.images.map(image => {
        return {
          name: image.name,
          createdDate : image.createdDate,
          url: image.url,
          id: image._id
        };
      });
    }))
    .subscribe((tranformedImage) => {
      this.images = tranformedImage;
      this.imagesUpdated.next([...this.images]);
    });
  }

  getImagesUpdatedListener() {
    return this.imagesUpdated.asObservable();
  }

  addImage(name: string, createdDate: string, url: string) {
    const image: Imagen = {id: null, name: name, createdDate: createdDate, url: url };
    this.http.post<{message: string, imageId: string}>('http://localhost:3000/api/images', image)
    .subscribe( responseData => {
      console.log(responseData.imageId);
      const id = responseData.imageId;
      image.id = id;
      this.images.push(image);
      this.imagesUpdated.next([...this.images]);
    });
  }

  deleteImage(imageId: string) {
    this.http.delete('http://localhost:3000/api/images' + imageId)
    .subscribe(() => {
      console.log('Deleted');
      const updatedImages = this.images.filter( image => imageId !== imageId);

      this.images = updatedImages;
      this.imagesUpdated.next([...this.images]);
    });
  }
}

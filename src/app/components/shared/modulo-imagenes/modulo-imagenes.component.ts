import { Imagen } from './../../../models/image';
import { ImagesService } from '../../../services/images.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-modulo-imagenes',
  templateUrl: './modulo-imagenes.component.html',
  styleUrls: ['./modulo-imagenes.component.css']
})
export class ModuloImagenesComponent implements OnInit, OnDestroy {
    linkBack: string;
    title: string;
    images: Imagen[] = [];
    newImage: Imagen;

    private imagesSub: Subscription;

    constructor(private route: ActivatedRoute, public imagesService: ImagesService) {}

    onAddImage() {
      this.imagesService.addImage('imagen 1', '10/07/2018', 'url');
    }

    onDelete(imageId: string) {
      this.imagesService.deleteImage(imageId);
    }

    ngOnDestroy() {
      this.imagesSub.unsubscribe();
    }

    ngOnInit() {
      switch (this.route.snapshot.params.view ) {
        case 'estacion-compresion':
            this.title = 'Estación de compresión';
            this.linkBack = '/estacion-compresion';
          break;
        case 'estacion-medicion':
          this.title = 'Estación de Medición';
          this.linkBack = '/estacion-medicion';
          break;
        case 'linea-marina':
          this.title = 'Línea Marina';
          this.linkBack = '/linea-marina';
          break;
        case 'linea-terrestre':
          this.title = 'Linea Terrestre';
          this.linkBack = '/linea-terrestre';
          break;
        default:
          break;
      }

      this.imagesService.getImages();
      this.imagesSub = this.imagesService.getImagesUpdatedListener()
      .subscribe((images: Imagen[]) => {
        this.images = images;
      });
      console.log(this.images);

  }
}

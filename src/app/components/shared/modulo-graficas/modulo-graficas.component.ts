import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modulo-graficas',
  templateUrl: './modulo-graficas.component.html',
  styleUrls: ['./modulo-graficas.component.css']
})
export class ModuloGraficasComponent implements OnInit {

    linkBack = '';
    title: string;

    constructor(private route: ActivatedRoute) { }

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
  }
}

import { ContentPage } from './../../models/contentPage';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estacion-medicion',
  templateUrl: './estacion-medicion.component.html',
  styleUrls: ['./estacion-medicion.component.css']
})
export class EstacionMedicionComponent implements OnInit {
  model: ContentPage;
  constructor() { }

  ngOnInit() {
    this.model = new ContentPage(
      'Estacion de medición',
      'estacion-medicion'
    );
  }

}

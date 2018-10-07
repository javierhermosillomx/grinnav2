import { ContentPage } from './../../models/contentPage';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-estacion-compresion',
  templateUrl: './estacion-compresion.component.html',
  styleUrls: ['./estacion-compresion.component.css']
})
export class EstacionCompresionComponent implements OnInit {

  model: ContentPage;

  constructor(

  ) { }

  ngOnInit() {
    this.model = new ContentPage(
      'Estacion de compresión',
      'estacion-compresion'
    );
  }

}

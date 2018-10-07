import { ContentPage } from './../../models/contentPage';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-linea-terrestre',
  templateUrl: './linea-terrestre.component.html',
  styleUrls: ['./linea-terrestre.component.css']
})
export class LineaTerrestreComponent implements OnInit {
  model: ContentPage;
  constructor() { }

  ngOnInit() {
    this.model = new ContentPage(
      'Línea terrestre',
      'linea-terrestre'
    );
  }

}

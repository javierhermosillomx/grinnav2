import { ContentPage } from './../../models/contentPage';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-linea-marina',
  templateUrl: './linea-marina.component.html',
  styleUrls: ['./linea-marina.component.css']
})
export class LineaMarinaComponent implements OnInit {
  model: ContentPage;

  constructor(

  ) { }

  ngOnInit() {
    this.model = new ContentPage(
      'Línea marina',
      'linea-marina'
    );
  }


}

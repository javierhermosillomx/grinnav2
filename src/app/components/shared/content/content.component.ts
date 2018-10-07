import { ContentPage } from './../../../models/contentPage';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() model: ContentPage;
  dataToView: ContentPage;
  title: string;
  parentURL: string;

  constructor() {
    // subtitle = this.model.title;
  }

  ngOnInit() {
    this.title = this.model.title;
    this.parentURL = this.model.parentURL;

    this.dataToView = new ContentPage(
      this.title,
      this.parentURL
    );
  }

}

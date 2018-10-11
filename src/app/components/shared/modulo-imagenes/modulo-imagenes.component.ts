import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from './mime-type.validator';

import { Document } from './../../../models/document';
import { DocumentsService } from '../../../services/documents.service';

@Component({
  selector: 'app-modulo-imagenes',
  templateUrl: './modulo-imagenes.component.html',
  styleUrls: ['./modulo-imagenes.component.css']
})
export class ModuloImagenesComponent implements OnInit {
    linkBack: string;
    title: string;
    documentName: string;
    document: Document;
    form: FormGroup;
    documentPreview: string;
    documentCategory: string;
    documentType = 'Imagen';

    private mode = 'create';
    private documentId: string;

    constructor(private route: ActivatedRoute, public documentsService: DocumentsService) {}

    ngOnInit() {
      switch (this.route.snapshot.params.view ) {
        case 'estacion-compresion':
            this.title = 'Estación de compresión';
            this.linkBack = '/estacion-compresion';
            this.documentCategory = 'estacion-compresion';
          break;
        case 'estacion-medicion':
          this.title = 'Estación de Medición';
          this.linkBack = '/estacion-medicion';
          this.documentCategory = 'estacion-medicion';
          break;
        case 'linea-marina':
          this.title = 'Línea Marina';
          this.linkBack = '/linea-marina';
          this.documentCategory = 'linea-marina';
          break;
        case 'linea-terrestre':
          this.title = 'Linea Terrestre';
          this.linkBack = '/linea-terrestre';
          this.documentCategory = 'linea-terrestre';
          break;
        default:
          break;
      }

      this.form = new FormGroup({
        document: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        }),
      });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('documentId')) {

        } else {
          this.mode = 'create';
          this.documentId = null;
        }
      });

  }


  onDocumentPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.documentName = file.name;
    this.form.patchValue({ document: file });
    this.form.get('document').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.documentPreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveDocument() {
    if (this.form.invalid) {
      alert('invalid');
      return;
    } else {
      const uploadDate: Date = new Date();
      this.documentsService.addDocument(
        this.documentName,
        this.documentCategory,
        this.documentType,
        '',
        uploadDate,
        this.form.value.document
      );
    }
    this.form.reset();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Document } from './../../../models/document';
import { DocumentsService } from '../../../services/documents.service';
import { Subscription } from 'rxjs';
import { saveAs } from 'file-saver';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modulo-graficas',
  templateUrl: './modulo-graficas.component.html',
  styleUrls: ['./modulo-graficas.component.css']
})
export class ModuloGraficasComponent implements OnInit {

  linkBack: string;
  section: string;
  title: string;
  documents: Document[] = [];
  document: Document;
  form: FormGroup;
  totalDocuments = 0;
  documentsPerPage: 20;
  currentPage = 1;
  pageSizeOptions = [10, 15, 20, 50];
  private documentsSub: Subscription;
  display = 'none';
  documentName: string;
  documentPreview: string;
  documentCategory: string;
  documentType = 'graficas';
  documentNameDataBase: string;
  documentFilePath = 'documents';
  documentCreatedBy: string;
  docuemntCreatedDate: string;
  userlogged = JSON.parse(localStorage.getItem('user'));
  displayConfirm = 'none';
  documentToDeleted: string;
  documentToDeletedId: string;

  constructor(
    private route: ActivatedRoute,
    public documentsService: DocumentsService,
    private flashMessagesService: FlashMessagesService
  ) {}

    ngOnInit() {
      switch (this.route.snapshot.params.view) {
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
          this.title = 'Línea Terrestre';
          this.linkBack = '/linea-terrestre';
          this.documentCategory = 'linea-terrestre';
          break;
        default:
          break;
      }
      this.section = 'Gráficas';

      this.GetAllDocuments();
      this.form = new FormGroup({
        document: new FormControl(null, {
          validators: [Validators.required]
        })
      });
  }

  openModal() {
    this.documentName = null;
    this.form.reset();
    this.display = 'block';
  }

  onCloseHandled() {
    this.display = 'none';
  }

  openModalConfimr(documentName: string, documentId: string) {
    this.documentToDeleted = documentName;
    this.documentToDeletedId = documentId;
    this.displayConfirm = 'block';
  }

  onCloseHandledConfirm() {
    this.documentToDeleted = null;
    this.documentToDeletedId = null;
    this.displayConfirm = 'none';
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
      this.flashMessagesService.show(
        'Ocurrió un problema al intentar guardar el documento.',
        { cssClass: 'alert-danger', timeout: 3000 }
      );
      return;
    } else {
      this.documentNameDataBase = Date.now() + '-' + this.documentName;
      this.documentFilePath = 'backend/documents';
      this.documentCreatedBy = this.userlogged.id;
      this.documentsService.addDocument(
        this.documentName,
        this.documentCategory,
        this.documentType,
        this.documentNameDataBase,
        this.documentFilePath,
        this.documentCreatedBy,
        this.form.value.document,
        'graficas/' + this.linkBack
      );
      this.display = 'none';
    }
  }

  GetAllDocuments() {
    this.documentsService.getDocuments(this.documentsPerPage, this.currentPage, this.documentType, this.documentCategory);
    this.documentsSub = this.documentsService
      .getDocumentUpdateListener()
      .subscribe(
        (documentData: { documents: Document[]; documentCount: number }) => {
          this.totalDocuments = documentData.documentCount;
          this.documents = documentData.documents;
        }
      );
  }

  deleteDocument(documentId: string) {
    const result = this.documentsService
      .deleteDocument(documentId)
      .subscribe(() => {
        this.documentsService.getDocuments(null, null, this.documentType, this.documentCategory);
        this.displayConfirm = 'none';
        this.documentToDeleted = null;
        this.documentToDeletedId = null;
        this.flashMessagesService.show(
          'Se elimino el documento exitosamente.',
          { cssClass: 'alert-success', timeout: 3000 }
        );
      });
  }

  stringAsDate(dateStr: string) {
    return new Date(dateStr);
  }

  download(documentDataBaseName) {
    const documentName = documentDataBaseName
      .toLowerCase()
      .split(' ')
      .join('-');
    this.documentsService.download(documentName).subscribe(
      data => {
        saveAs(data, documentName);
      },
      err => {
        this.flashMessagesService.show(
          'Problema al descargar el archivo.',
          { cssClass: 'alert-danger', timeout: 3000 }
        );
        console.error(err);
      }
    );
  }
}


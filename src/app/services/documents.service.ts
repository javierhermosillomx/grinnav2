import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Document } from './../models/document';

@Injectable({ providedIn: 'root' })
export class DocumentsService {
  private documents: Document[] = [];
  private documentsUpdated = new Subject<{
    documents: Document[];
  }>();


  constructor(private http: HttpClient, private router: Router) {}

  getDocuments(documentsPerPage: number, currentPage: number, documentType: string, documentCategory: string) {
    let params = new HttpParams();
    params = params.append('type', documentType );
    params = params.append('category', documentCategory );

    this.http
      .get<{ message: string; documents: any; }>(
        'http://localhost:3000/api/documents'
      , { params: params})
      .pipe(
        map(documentData => {
          return {
            documents: documentData.documents.map(document => {
              return {
                id: document._id,
                name: document.name,
                category: document.category,
                documentType: document.documentType,
                nameDataBase: document.nameDataBase,
                filePath: document.filePath,
                createdBy: document.createdBy,
                createdDate: document.createdDate,
                updatedBy: document.updatedBy,
                updatedDate: document.updatedDate
              };
            })
          };
        })
      )
      .subscribe(tranformedDocument => {
        this.documents = tranformedDocument.documents;
        this.documentsUpdated.next({
          documents: [...this.documents]
        });
      });
  }

  getDocumentsUpdatedListener() {
    return this.documentsUpdated.asObservable();
  }

  addDocument(
    name: string,
    category: string,
    documentType: string,
    nameDataBase: string,
    filePath: string,
    createdBy: string,
    file: File,
    returnURL: string
  ) {
    const documentData = new FormData();
    documentData.append('name', name);
    documentData.append('category', category);
    documentData.append('documentType', documentType);
    documentData.append('nameDataBase', nameDataBase);
    documentData.append('filePath', filePath);
    documentData.append('createdBy', createdBy);
    documentData.append('createdDate', '');
    documentData.append('file', file, nameDataBase);
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/api/documents',
        documentData
      )
      .subscribe(responseData => {
        this.getDocuments(null, null, documentType, category);
        this.router.navigate(['/' + returnURL]);
      });
  }

  getDocumentUpdateListener() {
    return this.documentsUpdated.asObservable();
  }

  getDocument(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      category: string;
      documentType: string;
      filePath: string;
      uploadDate: Date;
    }>('http://localhost:3000/api/documents/' + id);
  }

  deleteDocument(documentId: string) {
    return this.http.delete(
      'http://localhost:3000/api/documents/' + documentId
    );
  }

  downloadDocument(file: String) {
    const body = { filename: file };

    return this.http.post(
      'http://localhost:3000/api/documents/downloadDocument',
      body,
      {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/json')
      }
    );
  }
}

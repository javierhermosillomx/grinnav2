import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Document } from './../models/document';

@Injectable({providedIn: 'root'})
export class DocumentsService {
  private documents: Document[] = [];
  private documentsUpdated = new Subject<{ documents: Document[]; imageCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getDocuments(documentsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${documentsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, documents: any, maxDocuments: number}>(
      'http://localhost:3000/api/documents' + queryParams
    )
    .pipe(
        map(documentData => {
        return {
          documents: documentData.documents.map(image => {
          return {
            name: image.name,
            createdDate : image.createdDate,
            url: image.url,
            id: image._id
          };
        }),
        maxIamges: documentData.documents
        };
      })
    )
    .subscribe((tranformedImage) => {
      this.documents = tranformedImage.documents;
      this.documentsUpdated.next({
        documents: [...this.documents],
        imageCount: tranformedImage.maxIamges
      });
    });
  }

  getDocumentsUpdatedListener() {
    return this.documentsUpdated.asObservable();
  }

  addDocument(name: string, category: string, documentType: string, filePath: string, uploadDate: Date, file: File) {
    const documentData = new FormData();
    documentData.append('name', name);
    documentData.append('category', category);
    documentData.append('documentType', documentType);
    documentData.append('filePath', filePath);
    documentData.append('uploadDate', '');
    documentData.append('file', file, name);
    this.http
      .post<{ message: string; document: Document }>(
        'http://localhost:3000/api/documents',
        documentData
      )
      .subscribe(responseData => {
        this.router.navigate(['/']);
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
      uploadDate: Date
    }>('http://localhost:3000/api/documents/' + id);
  }

  deleteDocument(imageId: string) {
    return this.http
      .delete('http://localhost:3000/api/documents/' + imageId);
  }
}

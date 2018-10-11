export class Document {
  id: string;
  name: string;
  category: string;
  documentType: string;
  filePath: string;
  uploadDate: Date;
  constructor (
    id: string,
    name: string,
    category: string,
    documentType: string,
    filePath: string,
    uploadDate: Date
    ) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.documentType = documentType;
      this.filePath = filePath;
      this.uploadDate = uploadDate;
    }
}

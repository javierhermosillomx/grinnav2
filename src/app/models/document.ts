export class Document {
  id: string;
  name: string;
  category: string;
  documentType: string;
  nameDataBase: string;
  filePath: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  constructor (
    id: string,
    name: string,
    category: string,
    documentType: string,
    nameDataBase: string,
    filePath: string,
    createdBy: string,
    createdDate: string,
    updatedBy: string,
    updatedDate: string,

    ) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.documentType = documentType;
      this.nameDataBase = nameDataBase;
      this.filePath = filePath;
      this.createdBy = createdBy;
      this.createdDate = createdDate;
      this.updatedBy = updatedBy;
      this.updatedDate = updatedDate;
    }
}

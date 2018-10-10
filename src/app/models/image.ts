export class Imagen {
  id: string;
  name: string;
  createdDate: string;
  url: string;

  constructor (
    id: string,
    name: string,
    createdDate: string,
    url: string
    ) {
      this.id = id;
      this.name = name;
      this.createdDate = createdDate;
      this.url = url;
    }
}

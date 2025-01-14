export class Escola {
    public uid: string;
    public nome: string;
    public categoria: string;
    public endereco: string;
    public latitude: number;
    public longitude: number;
    public urlFoto: string;
    constructor(
      uid: string,
      nome: string,
      categoria: string,
      endereco: string,
      latitude: number,
      longitude: number,
      urlFoto: string,
    ) {
      this.uid = uid;
      this.nome = nome;
      this.categoria = categoria;
      this.endereco = endereco;
      this.latitude = latitude;
      this.longitude = longitude;
      this.urlFoto = urlFoto;
    }
  }

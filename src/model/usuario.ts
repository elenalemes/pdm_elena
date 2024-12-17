export class Usuario {
  public email: string;
  public nome: string;
  public urlFoto: string;
  public senha: string;

  constructor(
    email: string,
    nome: string,
    urlFoto: string,
    senha: string,
  ) {
    this.email = email;
    this.nome = nome;
    this.urlFoto = urlFoto;
    this.senha = senha;
  }
}
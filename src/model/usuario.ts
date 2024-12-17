import { Perfil } from './Perfil';

export class Usuario {
  public uid: string;
  public nome: string;
  public email: string;
  public cpf: string;
  public telefone: string;
  public senha: string;
  public perfil: Perfil;
  public urlFoto: string;
  constructor(
    uid: string,
    nome: string,
    email: string,
    cpf: string,
    telefone: string,
    senha: string,
    perfil: Perfil,
    urlFoto: string
  ) {
    this.uid = uid;
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.senha = senha;
    this.perfil = perfil;
    this.urlFoto = urlFoto;
  }
}

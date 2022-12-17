import { Endereco } from "./endereco.model";

export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public endereco?: Endereco,
    public telefone?: string,
    public salario?: number,
  ) { }
}

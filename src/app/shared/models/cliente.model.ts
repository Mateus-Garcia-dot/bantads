import { Endereco } from "./endereco.model";

export class Cliente {
  constructor(
    public id?: number,
    public nome?: string,
    public cpf?: string,
    public endereco?: number,
    public telefone?: string,
    public salario?: number,
  ) { }


  public toJson() {
    return {
      id: this.id,
      nome: this.nome,
      cpf: this.cpf,
      endereco: this.endereco,
      telefone: this.telefone,
      salario: this.salario,
    }
  }
}

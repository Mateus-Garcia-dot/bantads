import { Conta } from "./conta.model";

export class Gerente {
   constructor(
      public id?:number,
      public nome?: string,
      public cpf?: string,
      public telefone?: string,
      public clientes?: Conta[]
   ) {}

   toJson() {
      return {
         id: this.id,
         nome: this.nome,
         cpf: this.cpf,
         telefone: this.telefone,
         clientes: this.clientes
      }
   }
}

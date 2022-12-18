import { Cliente } from "./cliente.model";
import { Gerente } from "./gerente.model";
import { Movimentacao } from "./movimentacao.model";

export class Conta {
   constructor (
      public id: number,
      public cliente: Cliente,
      public gerente: Gerente,
      public limite: number,
   ) {}

   public toJson() {
      return {
         id: this.id,
         cliente: this.cliente.id,
         gerente: this.gerente.id,
         limite: this.limite,
      }
   }
}

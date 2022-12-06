import { Cliente } from "./cliente.model";
import { Gerente } from "./gerente.model";
import { Movimentacao } from "./movimentacao.model";

export class Conta {
   constructor (
      public numero: number,
      public cliente: Cliente,
      public limite: number,
      public gerente: Gerente,
      public movimentacoes: Movimentacao[]
   ) {}
}

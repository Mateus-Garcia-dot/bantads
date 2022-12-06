import { Cliente } from "./cliente.model";

export class Movimentacao {
   constructor(
      public data: Date,
      public tipo: number,
      public cliente: Cliente,
      public origem?: string,
      public destino?: string
   ) { }
}

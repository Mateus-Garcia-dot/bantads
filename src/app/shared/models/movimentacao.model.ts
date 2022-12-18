export class Movimentacao {
   constructor(
      public id: number,
      public data: Date,
      public valor: number,
      public tipo: number,
      public origem?: number,
      public destino?: number
   ) { }

   public toJson() {
      return {
         id: this.id,
         data: this.data,
         valor: this.valor,
         tipo: this.tipo,
         origem: this.origem,
         destino: this.destino
      }
   }
}

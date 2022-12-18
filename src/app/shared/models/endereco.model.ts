export class Endereco {
   constructor(
      public id?: number,
      public tipo?: string,
      public logradouro?: string,
      public numero?: number,
      public cidade?: string,
      public complemento?: string,
      public cep?: string,
      public estado?: string
   ) { }


   public toJson() {
      return {
         id: this.id,
         tipo: this.tipo,
         logradouro: this.logradouro,
         numero: this.numero,
         cidade: this.cidade,
         complemento: this.complemento,
         cep: this.cep,
         estado: this.estado
      }
   }
}

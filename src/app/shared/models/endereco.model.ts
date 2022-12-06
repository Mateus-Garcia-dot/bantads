export class Endereco {
   constructor(
      public tipo?: string,
      public logradouro?: string,
      public numero?: number,
      public cidade?: string,
      public complemento?: string,
      public cep?: string,
      public estado?: string
   ) { }
}

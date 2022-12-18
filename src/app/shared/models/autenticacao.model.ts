
export enum autenticacaoType {
   ADMIN = 1,
   CLIENTE = 2,
   GERENTE = 3
} 

export class Autenticacao {
 constructor( 
    public id: number,
    public login: string,
    public senha: string,
    public tipo: autenticacaoType,
    public conta?: number
  ) {}

   toJson() {
      return {
         id: this.id,
         login: this.login,
         senha: this.senha,
         type: this.tipo,
         conta: this.conta
      }
    }
}


export enum autenticacaoType {
  ADMIN = 1,
  CLIENTE = 2,
  GERENTE = 3,
}

export class Autenticacao {
  constructor(
    public uuid?: string,
    public login?: string,
    public password?: string,
    public type?: autenticacaoType,
    public isPending?: boolean,
    public isApproved?: boolean,
    public customer?: string
  ) { }

  toJson() {
    return {
      login: this.login,
      password: this.password,
      type: this.type,
      isPending: this.isPending,
      isApproved: this.isApproved,
      customer: this.customer,
    };
  }
}

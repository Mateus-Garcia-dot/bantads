import { Autenticacao } from './autenticacao.model';
import { Conta } from './conta.model';

export class Gerente {
  constructor(
    public uuid?: string,
    public name?: string,
    public cpf?: string,
    public telephone?: string,
    public authentication?: Autenticacao
  ) { }

  toJson() {
    return {
      uuid: this.uuid,
      name: this.name,
      cpf: this.cpf,
      telephone: this.telephone,
    };
  }
}

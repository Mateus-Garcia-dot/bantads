import { Cliente } from './cliente.model';
import { Gerente } from './gerente.model';
import { Movimentacao } from './movimentacao.model';

export class Conta {
  constructor(
    public uuid?: string,
    public customer?: string,
    public manager?: string,
    public limitAmount?: number,
    public balance?: number
  ) { }

  public toJson() {
    return {
      uuid: this.uuid,
      customer: this.customer,
      manager: this.manager,
      limitAmount: this.limitAmount,
      balance: this.balance,
    };
  }
}

import { Cliente } from './cliente.model';
import { Gerente } from './gerente.model';
import { Movimentacao } from './movimentacao.model';

export class Conta {
  constructor(
    public id?: number,
    public cliente?: number,
    public gerente?: number,
    public limite?: number,
    public saldo?: number
  ) {}

  public toJson() {
    return {
      id: this.id,
      cliente: this.cliente,
      gerente: this.gerente,
      limite: this.limite,
      saldo: this.saldo,
    };
  }
}

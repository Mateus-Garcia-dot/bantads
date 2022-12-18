import { Cliente } from './cliente.model';
import { Gerente } from './gerente.model';
import { HistoricoTransacao } from './historico-transacao.model';

export class Conta {
  constructor(
    public id?: number,
    public numeroConta?: number,
    public pendenteAprovacao: boolean = true,
    public gerente?: Gerente,
    public limite?: number,
    public cliente?: Cliente,
    public aprovada?: boolean,
    public dataCriacao?: Date,
    public saldo: number = 0,
    public historicoMovimentacoes: HistoricoTransacao [] = []
  ) {
    this.dataCriacao = new Date();
    this.historicoMovimentacoes = [];
    this.saldo = 0;
  }
}

import { Injectable } from '@angular/core';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';

const LS_CHAVE: string = 'transacoes';

@Injectable({
  providedIn: 'root'
})
export class HistoricoTransacaoService {

  constructor() { }

  listarTodosPorContaId(contaId?: number): HistoricoTransacao[] {
    const transacoes = localStorage[LS_CHAVE];
    return transacoes ? JSON.parse(transacoes).filter((transacao: HistoricoTransacao) => transacao?.contaOrigem?.id == contaId || transacao?.contaDestino?.id == contaId) : [];
  }

  listarTodos(): HistoricoTransacao[] {
    const transacoes = localStorage[LS_CHAVE];
    return transacoes ? JSON.parse(transacoes) : [];
  }

  salvarTransacao(transacao: HistoricoTransacao) {
    const transacoes = this.listarTodos();
    transacoes.push(transacao);
    localStorage[LS_CHAVE] = JSON.stringify(transacoes);
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TipoTransacao } from 'src/shared/enums/tipo-transacao';
import { Cliente } from 'src/shared/models/cliente.model';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';
import { HistoricoTransacaoService } from '../services/historico-transacao.service';

@Component({
  selector: 'app-cliente-extrato',
  templateUrl: './cliente-extrato.component.html',
  styleUrls: ['./cliente-extrato.component.css'],
})
export class ClienteExtratoComponent implements OnInit {
  @ViewChild('formFiltro') formFiltro!: NgForm;
  filtro: { dataIncial?: Date; dataFinal?: Date } = {
    dataFinal: undefined,
    dataIncial: undefined,
  };

  clienteLogado?: Cliente | null;
  historicoTransacoes: HistoricoTransacao[] = [];
  transacoes: HistoricoTransacao[] = [];

  tipoTransacao = TipoTransacao;

  constructor(
    private historicoTransacoesService: HistoricoTransacaoService,
  ) {
    this.historicoTransacoesService.listarTransacoesPorContaId(this.clienteLogado?.conta?.id).subscribe(transacoes => this.historicoTransacoes = transacoes);
  }

  ngOnInit(): void { }

  filtrar() {
    if (this.filtro.dataIncial && this.filtro.dataFinal) {
      this.transacoes = this.historicoTransacoes.filter(
        (transacao: HistoricoTransacao) =>
          new Date(transacao!.data!) >=
          new Date(this.filtro!.dataIncial!) &&
          new Date(transacao!.data!) <=
          new Date(this.filtro!.dataFinal!)
      );
    }
  }
}

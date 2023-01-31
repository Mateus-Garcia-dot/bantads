import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { TipoTransacao } from 'src/shared/enums/tipo-transacao';
import { Cliente } from 'src/shared/models/cliente.model';
import { Conta } from 'src/shared/models/conta.model';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';
import { ClienteService } from '../services/cliente.service';
import { ContaService } from '../services/conta.service';
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
  conta!: Conta;

  tipoTransacao = TipoTransacao;

  loading = true;

  constructor(
    private historicoTransacoesService: HistoricoTransacaoService,
    private loginService: LoginService,
    private clienteService: ClienteService,
    private contaService: ContaService
  ) {

    this.clienteService.buscarClientePorUsuario(this.loginService.usuarioLogado)
      .pipe(switchMap(cliente => {
        this.clienteLogado = cliente[0];
        return this.contaService.buscarContaPorCliente(this.clienteLogado.id)
      }))
      .subscribe(conta => {
        this.conta = conta[0];
        this.clienteLogado!.conta = conta[0];

        console.log(conta)

        this.historicoTransacoesService
          .listarTransacoesPorContaId(this.clienteLogado?.conta?.id)
          .subscribe(transacoes => {
            this.transacoes = transacoes;
            this.loading = false;
          });
      });
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

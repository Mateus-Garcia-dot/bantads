import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { Cliente } from 'src/shared/models/cliente.model';
import { Conta } from 'src/shared/models/conta.model';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';
import { ClienteService } from '../services/cliente.service';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cliente-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css'],
})
export class ClienteHomeComponent implements OnInit {

  conta!: Conta;
  cliente!: Cliente;

  valorSaque: number = 0;
  valorDeposito: number = 0;
  valorTransferencia: number = 0;
  numeroContaDestino: number = 0;

  transacoes!: HistoricoTransacao[];

  constructor(
    private loginService: LoginService,
    private clienteService: ClienteService,
    private contaService: ContaService
  ) {
  }

  ngOnInit(): void {
    this.clienteService.buscarClientePorUsuario(this.loginService.usuarioLogado)
      .pipe(switchMap(cliente => {
        this.cliente = cliente[0];
        return this.contaService.buscarContaPorCliente(this.cliente.id)
      }))
      .subscribe(conta => {
        this.conta = conta[0];
        this.cliente.conta = conta[0];
      });
  }

  sacar() {
    this.clienteService.sacar(this.valorSaque, this.cliente).subscribe();
  }

  depositar() {
    this.clienteService.depositar(this.valorDeposito, this.cliente).subscribe();
  }

  transferir() {
    this.clienteService.transferir(this.cliente, this.numeroContaDestino, this.valorTransferencia).subscribe({
      next: (result) => {},
      error: (error) => {
        alert('ocorreu um erro, verifique se existe essa conta');
      },
  })
  }
}

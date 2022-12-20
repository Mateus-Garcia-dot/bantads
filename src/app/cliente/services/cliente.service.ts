import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { TipoTransacao } from 'src/shared/enums/tipo-transacao';
import { Cliente } from 'src/shared/models/cliente.model';
import { Conta } from 'src/shared/models/conta.model';
import { Gerente } from 'src/shared/models/gerente.model';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';
import { Usuario } from 'src/shared/models/usuario.model';
import { ContaService } from './conta.service';
import { HistoricoTransacaoService } from './historico-transacao.service';


@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private BASE_URL = `http://localhost:3000/clientes`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage['token']
    })
  };

  constructor(
    private contaService: ContaService,
    private historicoTransacoesService: HistoricoTransacaoService,
    private usuarioService: UsuarioService,
    private HttpClient: HttpClient
  ) { }

  buscarClientePorId(clienteId: number): Observable<Cliente> {
    return this.HttpClient.get<Cliente>(`${this.BASE_URL}/${clienteId}`, this.httpOptions);
  }

  buscarClientePorUsuario(usuario: Usuario): Observable<Cliente[]> {
    return this.HttpClient.get<Cliente[]>(`${this.BASE_URL}?usuarioId=${usuario.id}`, this.httpOptions);
  }

  listarTodos(): Observable<Cliente[]> {
    return this.HttpClient.get<Cliente[]>(this.BASE_URL, this.httpOptions);
  }

  autocadastrar(cliente: Cliente): Observable<Cliente> {
    return this.HttpClient.post<Cliente>(`${this.BASE_URL}`, cliente, this.httpOptions);
  }

  atualizaCliente(cliente: Cliente): Observable<Cliente> {
    return this.HttpClient.put<Cliente>(`${this.BASE_URL}`, cliente, this.httpOptions);
  }

  buscarClientePorCpf(cpf: string): Observable<Cliente[]> {
    return this.HttpClient.get<Cliente[]>(`${this.BASE_URL}?cpf=${cpf}`, this.httpOptions);

  }

  sacar(valorSaque: number, cliente: Cliente) {
    return this.contaService.sacar(valorSaque, cliente.conta!).pipe(switchMap(() =>
      this.historicoTransacoesService.salvarTransacao(new HistoricoTransacao(TipoTransacao.SAQUE, valorSaque, cliente.conta))
    ))
  }

  transferir(cliente: Cliente, numeroContaDestino: number, saldo: number): Observable<any> {
    return this.contaService.transferir(cliente.conta!, numeroContaDestino, saldo).pipe(switchMap(() => this.historicoTransacoesService.salvarTransacao(
      new HistoricoTransacao(TipoTransacao.TRANSFERENCIA, saldo, cliente.conta)
    )))
  }

  depositar(valorDeposito: number, cliente: Cliente) {
    return this.contaService.depositar(valorDeposito, cliente.conta!).pipe(switchMap(() => {
      return this.historicoTransacoesService.salvarTransacao(
        new HistoricoTransacao(
          TipoTransacao.DEPOSITO,
          valorDeposito,
          cliente.conta
        )
      );
    }));
  }

  recusarCadastro(cliente: Cliente): Observable<any>{
    return this.contaService.recusarConta(cliente.conta);
  }

  aprovarCadastro(cliente: Cliente): Observable<any> {
    return this.contaService.aprovarConta(cliente.conta);
  }

}

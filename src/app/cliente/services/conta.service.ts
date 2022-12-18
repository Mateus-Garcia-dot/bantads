import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from 'src/shared/models/cliente.model';
import { Conta } from 'src/shared/models/conta.model';
import { Gerente } from 'src/shared/models/gerente.model';

const LS_CHAVE: string = 'contas';

@Injectable({
  providedIn: 'root',
})
export class ContaService {

  private BASE_URL = `http://localhost:3000/contas`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  criarConta(cliente: Cliente, gerente: Gerente): Conta {
    const id = new Date().getTime();
    const limite =
      cliente.salario && cliente.salario >= 2000
        ? cliente.salario / 2
        : undefined;
    const novaConta = new Conta(
      id,
      ++this.listarTodas().length,
      true,
      gerente,
      limite,
      cliente
    );
    const contas = this.listarTodas();
    contas.push(novaConta);
    localStorage[LS_CHAVE] = JSON.stringify(contas);
    return novaConta;
  }

  buscarContaPorCliente(clienteId?: number): Observable<Conta>{
    return this.httpClient.get<Conta>(`${this.BASE_URL}/cliente/${clienteId}`, this.httpOptions);
  }

  aprovarConta(conta?: Conta) {
    conta!.aprovada = true;
    conta!.pendenteAprovacao = false;
    this.atualizaConta(conta!);
  }

  recusarConta(conta?: Conta) {
    conta!.aprovada = false;
    conta!.pendenteAprovacao = false;
    this.atualizaConta(conta!);
  }

  listarTodas(): Conta[] {
    const contas = localStorage[LS_CHAVE];
    return contas ? JSON.parse(contas) : [];
  }

  sacar(valorSaque: number, conta: Conta) {
    if (-(conta?.saldo) + valorSaque < conta.limite!) {
      conta.saldo -= valorSaque;
      this.atualizaConta(conta);
    }
  }

  transferir(
    conta: Conta,
    numeroContaDestino: number,
    valorTransferencia: number
  ) {
    const contaDestino = this.listarTodas().find((conta) => (conta.numeroConta = numeroContaDestino));
    if (-(conta?.saldo) + valorTransferencia < conta.limite!) {
      
      conta.saldo -= valorTransferencia;
      contaDestino!.saldo += valorTransferencia;
      this.atualizaConta(conta);
      this.atualizaConta(contaDestino!);
    }
  }

  depositar(valorDeposito: number, conta: Conta) {
    conta.saldo += valorDeposito;
    this.atualizaConta(conta);
  }

  atualizaConta(conta: Conta) {
    if (conta) {
      const contas = this.listarTodas();
      contas.forEach((obj, index, objs) => {
        if (conta.id === obj.id) {
          objs[index] = conta;
        }
      });

      localStorage[LS_CHAVE] = JSON.stringify(contas);
    }
  }
}

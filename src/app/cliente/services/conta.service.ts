import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
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

  constructor(private httpClient: HttpClient) { }

  criarConta(cliente: Cliente, gerente: Gerente): Observable<Conta> {
    const id = new Date().getTime();
    const limite =
      cliente.salario && cliente.salario >= 2000
        ? cliente.salario / 2
        : undefined;

    return this.listarTodas()
      .pipe(switchMap((contas) => {
        const novaConta = new Conta(
          id,
          ++contas.length,
          true,
          gerente,
          limite,
          cliente
        );
        return this.httpClient.post<Conta>(this.BASE_URL, novaConta, this.httpOptions);
      }));

  }

  buscarContaPorCliente(clienteId?: number): Observable<Conta[]> {
    return this.httpClient.get<Conta[]>(`${this.BASE_URL}?cliente.id=${clienteId}`, this.httpOptions);
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

  getByNumeroConta(numeroConta: any) {
    return this.httpClient.get<Conta>(`${this.BASE_URL}?numeroConta=${numeroConta}` , this.httpOptions);
  }

  listarTodas(): Observable<Conta[]> {
    return this.httpClient.get<Conta[]>(this.BASE_URL, this.httpOptions);

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
    
     this.getByNumeroConta(numeroContaDestino).subscribe(contaDestino => {
      if (-(conta?.saldo) + valorTransferencia < conta.limite!) {

        conta.saldo -= valorTransferencia;
        contaDestino!.saldo += valorTransferencia;
        this.atualizaConta(conta);
        this.atualizaConta(contaDestino!);
      }
    })
  }

  depositar(valorDeposito: number, conta: Conta) {
    conta.saldo += valorDeposito;
    this.atualizaConta(conta);
  }

  atualizaConta(conta: Conta): Observable<any> {
    return this.httpClient.put(` ${this.BASE_URL}/${conta.id}`, conta, this.httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricoTransacao } from 'src/shared/models/historico-transacao.model';

const LS_CHAVE: string = 'transacoes';

@Injectable({
  providedIn: 'root'
})
export class HistoricoTransacaoService {

  private BASE_URL = `http://localhost:3000/transacoes`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage['token']
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTransacoesPorContaId(contaId?: number): Observable<HistoricoTransacao[]> {
    return this.httpClient.get<HistoricoTransacao[]>(`${this.BASE_URL}?contaId=${contaId}`);
  }

  listarTodos(): Observable<HistoricoTransacao[]> {
    return this.httpClient.get<HistoricoTransacao[]>(this.BASE_URL);
  }

  salvarTransacao(transacao: HistoricoTransacao): Observable<any> {
    return this.httpClient.post<HistoricoTransacao[]>(this.BASE_URL, transacao);
  }

}

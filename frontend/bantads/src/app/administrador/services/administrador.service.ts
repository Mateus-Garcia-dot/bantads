import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gerente } from 'src/shared/models/gerente.model';

const LS_CHAVE: string = "adminstrador";

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private BASE_URL = `http://localhost:3000/gerentes/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage['token']
    })
  };

  constructor(private httpClient: HttpClient) { }

  listarTodos(): Observable<Gerente[]> {
    return this.httpClient.get<Gerente[]>(this.BASE_URL, this.httpOptions);
  }

  inserir(gerente: Gerente): Observable<any> {
    return this.httpClient.post<Gerente[]>(this.BASE_URL, gerente, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Gerente | undefined> {
    return this.httpClient.get<Gerente>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }

  atualizar(gerente: Gerente): Observable<any> {
    return this.httpClient.put<Gerente>(`${this.BASE_URL}/${gerente.id}`, gerente, this.httpOptions);
  }

  remover(id: number): Observable<any> {
    return this.httpClient.delete<Gerente>(`${this.BASE_URL}/${id}`, this.httpOptions);
  }
}

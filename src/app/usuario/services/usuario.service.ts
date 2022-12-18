import { Injectable } from '@angular/core';
import { Usuario } from 'src/shared/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

const LS_CHAVE: string = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = `http://localhost:3000/usuarios/`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage['token']
    })
  };

  constructor(private httpClient: HttpClient) { }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.BASE_URL, JSON.stringify(usuario), this.httpOptions);
  }

  listarTodos(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.BASE_URL, this.httpOptions);
  }

  buscarUsuario(login: string, senha: string) {
    return this.httpClient.get<Usuario[]>(this.BASE_URL, this.httpOptions);
  }

  buscarPorId(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.BASE_URL}${id}`, this.httpOptions);
  }
}

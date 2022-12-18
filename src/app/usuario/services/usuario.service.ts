import { Injectable } from '@angular/core';
import { Usuario } from 'src/shared/models/usuario.model';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from 'src/shared/models/login.model';
import { LoginUsuario } from 'src/shared/models/login-usuario.model';

const LS_CHAVE: string = 'usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private BASE_URL = `http://localhost:3000/usuarios/`;
  private AUTH_BASE_URL = `http://localhost:3000`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage['token']
    })
  };

  constructor(private httpClient: HttpClient) { }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>('http://localhost:3000/cadastrar', JSON.stringify(usuario), this.httpOptions);
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

  login(login: Login): Observable<LoginUsuario> {
    return this.httpClient.post<LoginUsuario>(`${this.AUTH_BASE_URL}/login`, JSON.stringify(login), this.httpOptions);
  }

  logout() {
    return this.httpClient.get<Usuario>(`${this.AUTH_BASE_URL}/logout`, this.httpOptions);
  }
}

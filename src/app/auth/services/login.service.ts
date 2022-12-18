import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { LoginUsuario } from 'src/shared/models/login-usuario.model';
import { Login } from 'src/shared/models/login.model';
import { Usuario } from 'src/shared/models/usuario.model';

const LS_CHAVE: string = 'usuarioLogado';
const LS_CHAVE_TOKEN: string = 'token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private AUTH_BASE_URL = `http://localhost:3000`;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'x-access-token': localStorage['token']
    })
  };

  constructor(private httpClient: HttpClient) {}

  public get usuarioLogado(): Usuario {
    let usuarioLogado = localStorage[LS_CHAVE];
    return usuarioLogado ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }
  
  setUsuarioLogado(login: Usuario) {
    if(login) {
      this.usuarioLogado = login;
    }
  }

  login(login: Login): Observable<any> {
    return this.httpClient.get<any>(`${this.AUTH_BASE_URL}/usuarios?login=${login.login}&senha=${login.senha}`, this.httpOptions);
  }

  logout() {
    return of();
  }
}

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

  constructor(private usuarioService: UsuarioService) {}

  public get usuarioLogado(): Usuario {
    let usuarioLogado = localStorage[LS_CHAVE];
    return usuarioLogado ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }
  
  setUsuarioLogado(login: LoginUsuario) {
    if(login?.data) {
      this.usuarioLogado = login.data;
      localStorage[LS_CHAVE_TOKEN] = JSON.stringify(login.token);
      localStorage[LS_CHAVE] = JSON.stringify(login.token);
    }
  }

  login(login: Login) : Observable<LoginUsuario | null> {
    return this.usuarioService.login(login);
  }

  logout() {
    return this.usuarioService.logout();
  }
}

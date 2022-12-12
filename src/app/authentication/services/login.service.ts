import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';

const LS_CHAVE: string = "usuarioLogado"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public get usuarioLogado(): Cliente {
    let usu = localStorage[LS_CHAVE]
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null
  }

  public set usuarioLogado(usuario: Cliente) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario)
  }

  logout() {
    delete localStorage[LS_CHAVE]
  }

  public async login(email: string, senha: string): Promise<boolean> {
    const user = await db.get('/cliente', {
      params: {
        email,
        senha,
        "_limit": 1
      }
    })
    if (user.data.length === 0) {
      return false
    }
    localStorage[LS_CHAVE] = JSON.stringify(user.data)
    return true
  }


}

import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { autenticacaoType } from 'src/app/shared/models/autenticacao.model';
import { CrudAutenticacaoService } from './crud-autenticacao.service';

const LS_CHAVE: string = "loggedUser"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private crudAuthService: CrudAutenticacaoService
  ) {}

  async isLoggedIn(): Promise<boolean> {
    return localStorage[LS_CHAVE] !== undefined
  }

  logout() {
    delete localStorage[LS_CHAVE]
  }

  public async login(email: string, senha: string): Promise<boolean> {
    const autenticacao = await db.get('/autenticacao', {
      params: {
        email,
        senha,
        "_limit": 1
      }
    })
    if (autenticacao.data.length === 0) {
      return false
    }
    localStorage[LS_CHAVE] = JSON.stringify(autenticacao.data[0])
    return true
  }

  public async getLoggedUser() {
    return null
  }

  public async getPermissionLevel(): Promise<autenticacaoType> {
    const LS = JSON.parse(localStorage[LS_CHAVE])
    const auth = await this.crudAuthService.getAutenticacao(Number(LS.id))
    return auth.tipo
  }

  public  getContaId() {
    const LS = JSON.parse(localStorage[LS_CHAVE])
    return Number(LS.conta) 
  }

}

import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { CrudAutenticacaoService } from './crud-autenticacao.service';

const LS_CHAVE: string = 'loggedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private crudAuthService: CrudAutenticacaoService) { }

  async isLoggedIn(): Promise<boolean> {
    return localStorage[LS_CHAVE] !== undefined;
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  public async login(login: string, password: string): Promise<boolean> {
    try {
      const autenticacao = await db.post('/login', {
        login,
        password,
      });
      localStorage[LS_CHAVE] = JSON.stringify(autenticacao.data);
      return true;
    } catch (err) {
      return false;
    }
  }

  public async getPermissionLevel() {
    const LS = JSON.parse(localStorage[LS_CHAVE]).type;
    if (!LS) {
      return 0;
    }
    return LS;
  }

  public getAutenticacaoId() {
    const id = JSON.parse(localStorage[LS_CHAVE]).uuid;
    return id;
  }

  public getCustumerId() {
    const id = JSON.parse(localStorage[LS_CHAVE]).customer;
    return id;
  }

}

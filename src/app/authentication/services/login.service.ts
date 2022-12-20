import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { CrudAutenticacaoService } from './crud-autenticacao.service';

const LS_CHAVE: string = 'loggedUser';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private crudAuthService: CrudAutenticacaoService) {}

  async isLoggedIn(): Promise<boolean> {
    return localStorage[LS_CHAVE] !== undefined;
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  public async login(email: string, senha: string): Promise<boolean> {
    const autenticacao = await db.get('/autenticacao', {
      params: {
        email,
        senha,
      },
    });
    const match = autenticacao.data.find(
      (auth: any) => auth.login === email && auth.senha === senha
    );
    if (!match) {
      return false;
    }
    if (match.isPending) {
      return false;
    }
    localStorage[LS_CHAVE] = JSON.stringify(match.id);
    return true;
  }

  public async getPermissionLevel() {
    const LS = localStorage[LS_CHAVE];
    if (!LS) {
      return 0;
    }
    const auth = await this.crudAuthService.getAutenticacao(Number(LS));
    return auth.tipo;
  }

  public getAutenticacaoId() {
    const id = localStorage[LS_CHAVE];
    return Number(id);
  }
}

import { Injectable } from '@angular/core';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';

const LS_CHAVE: string = "loggedUser"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private crudCliente: CrudClienteService) {}

  async isLoggedIn(): Promise<boolean> {
    return localStorage[LS_CHAVE] !== undefined
  }

  logout() {
    delete localStorage[LS_CHAVE]
  }

  public async login(email: string, senha: string): Promise<boolean> {
    const cliente = await db.get('/cliente', {
      params: {
        email,
        senha,
        "_limit": 1
      }
    })
    if (cliente.data.length === 0) {
      return false
    }
    localStorage[LS_CHAVE] = cliente.data[0].id
    return true
  }

  public async getLoggedUser(): Promise<Cliente> {
    return this.crudCliente.getCliente(localStorage[LS_CHAVE])
  }


}

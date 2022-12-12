import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

const LS_CHAVE: string = "usuarioLogado"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  getUsuario() {
    try {
      const plainJson = JSON.parse(localStorage[LS_CHAVE])[0]
      const endereco = new Endereco(
        plainJson.endereco.tipo,
        plainJson.endereco.logradouro,
        plainJson.endereco.numero,
        plainJson.endereco.cidade,
        plainJson.endereco.complemento,
        plainJson.endereco.cep,
        plainJson.endereco.estado
      )
      const user = new Cliente(
        plainJson.nome,
        plainJson.email,
        plainJson.cpf,
        endereco,
        plainJson.telefone,
        plainJson.salario
      )
      return user
    } catch (err) {
      console.log(err)
      return null
    }
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

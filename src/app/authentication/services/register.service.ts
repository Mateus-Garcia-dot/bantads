import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  async register(cliente: Cliente, endereco: Endereco, senha: string) {
    await db.post('/cliente', {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      senha,
      endereco: {
        tipo: endereco.tipo,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
        cidade: endereco.cidade,
        complemento: endereco.complemento,
        cep: endereco.cep,
        estado: endereco.estado
      },
      telefone: cliente.telefone,
      salario: cliente.salario
    })
  }
}

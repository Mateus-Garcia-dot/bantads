import { Injectable } from '@angular/core';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { CrudAutenticacaoService } from './crud-autenticacao.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { Conta } from 'src/app/shared/models/conta.model';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import db from 'src/app/shared/database/database';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor() { }

  async register(customer: Cliente, address: Endereco, authentication: Autenticacao) {
    db.post('/customer', {
      name: customer.name,
      cpf: customer.cpf,
      phone: customer.phone,
      salary: customer.salary,
      address: address.toJson(),
      authentication: authentication.toJson(),
    });
  }
}

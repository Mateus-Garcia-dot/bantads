import { Injectable } from '@angular/core';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private crudClienteService: CrudClienteService,
    private crudEnderecoService: CrudEnderecoService,
  ) { }

  async register(cliente: Cliente, endereco: Endereco, senha: string) {
    const enderecoId = await this.crudEnderecoService.createEndereco(endereco)
    await this.crudClienteService.createCliente(cliente, enderecoId, senha)
  }
}

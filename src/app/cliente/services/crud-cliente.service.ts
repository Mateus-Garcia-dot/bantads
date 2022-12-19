import { Injectable } from '@angular/core';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class CrudClienteService {
  constructor() {}

  public async getCliente(id: number) {
    const response = await db.get(`/cliente/${id}`);
    return new Cliente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.endereco,
      response.data.telefone,
      response.data.salario
    );
  }

  public async getClientes() {
    const response = await db.get('/cliente');
    response.data.reduce((acc: Cliente[], cliente: any) => {
      acc.push(
        new Cliente(
          cliente.id,
          cliente.nome,
          cliente.cpf,
          cliente.endereco,
          cliente.telefone,
          cliente.salario
        )
      );
      return acc;
    }, []);
  }

  public async createCliente(cliente: Cliente) {
    const response = await db.post('/cliente', cliente.toJson());
    return new Cliente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.endereco,
      response.data.telefone,
      response.data.salario
    );
  }

  public async updateCliente(cliente: Cliente) {
    const response = await db.patch(`/cliente/${cliente.id}`, {
      nome: cliente.nome,
      cpf: cliente.cpf,
      endereco: cliente.endereco,
      telefone: cliente.telefone,
      salario: cliente.salario,
    });
    return new Cliente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.endereco,
      response.data.telefone,
      response.data.salario
    );
  }

  public async deleteCliente(id: number) {
    await db.delete(`/cliente/${id}`);
  }
}

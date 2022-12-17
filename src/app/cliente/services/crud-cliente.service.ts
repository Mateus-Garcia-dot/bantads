import { Injectable } from '@angular/core';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import db from 'src/app/shared/database/database';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CrudClienteService {

  constructor(private crudEndereco: CrudEnderecoService) { }

  public  async getCliente(id: number) {
    const response =  await db.get(`/cliente/${id}`)
    const endereco = await this.crudEndereco.getEndereco(response.data.endereco)
    return new Cliente(
      response.data.id,
      response.data.nome,
      response.data.email,
      response.data.cpf,
      endereco,
      response.data.telefone,
      response.data.salario,
    )
  }

  public async getClientes() {
    return await db.get('/cliente')
  }

  public async createCliente(cliente: Cliente, enderecoId: number, senha: string) {
    const response = await db.post('/cliente', {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      senha,
      endereco: enderecoId,
      telefone: cliente.telefone,
      salario: cliente.salario
    })
    return response.data.id
  }

  public async updateCliente(cliente: Cliente, senha: string) {
    const enderecoId = await this.crudEndereco.updateEndereco(cliente.endereco!)
    const response = await db.patch(`/cliente/${cliente.id}`, {
      nome: cliente.nome,
      email: cliente.email,
      cpf: cliente.cpf,
      endereco: enderecoId,
      telefone: cliente.telefone,
      salario: cliente.salario,
      senha: senha || undefined
    })
    return response.data.id
  }

  public async deleteCliente(id: number) {
    await db.delete(`/cliente/${id}`)
  }

}

import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root'
})
export class CrudEnderecoService {

  constructor() { }

  async getEndereco(id: number) {
    const response = await db.get(`/endereco/${id}`)
    return new Endereco(
      response.data.id,
      response.data.tipo,
      response.data.logradouro,
      response.data.numero,
      response.data.cidade,
      response.data.complemento,
      response.data.cep,
      response.data.estado
    )
  }

  async getEnderecos() {
    return await db.get('/endereco')
  }

  async createEndereco(endereco: Endereco) {
    const response = await db.post('/endereco', {
      tipo: endereco.tipo,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cidade: endereco.cidade,
      complemento: endereco.complemento,
      cep: endereco.cep,
      estado: endereco.estado
    })
    return response.data.id
  }

  async updateEndereco(endereco: Endereco) {
    const response = await db.patch(`/endereco/${endereco.id}`, {
      tipo: endereco.tipo,
      logradouro: endereco.logradouro,
      numero: endereco.numero,
      cidade: endereco.cidade,
      complemento: endereco.complemento,
      cep: endereco.cep,
      estado: endereco.estado
    })
    return response.data.id
  }

  async deleteEndereco(id: number) {
    await db.delete(`/endereco/${id}`)
  }

}

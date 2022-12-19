import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Injectable({
  providedIn: 'root',
})
export class CrudEnderecoService {
  constructor() {}

  async getEndereco(id: number) {
    const response = await db.get(`/endereco/${id}`);
    return new Endereco(
      response.data.id,
      response.data.tipo,
      response.data.logradouro,
      response.data.numero,
      response.data.cidade,
      response.data.complemento,
      response.data.cep,
      response.data.estado
    );
  }

  async getEnderecos() {
    const response = await db.get('/endereco');
    response.data.reduce((acc: Endereco[], endereco: any) => {
      acc.push(
        new Endereco(
          endereco.id,
          endereco.tipo,
          endereco.logradouro,
          endereco.numero,
          endereco.cidade,
          endereco.complemento,
          endereco.cep,
          endereco.estado
        )
      );
      return acc;
    }, []);
  }

  async createEndereco(endereco: Endereco) {
    const response = await db.post('/endereco', endereco.toJson());
    return new Endereco(
      response.data.id,
      response.data.tipo,
      response.data.logradouro,
      response.data.numero,
      response.data.cidade,
      response.data.complemento,
      response.data.cep,
      response.data.estado
    );
  }

  async updateEndereco(endereco: Endereco) {
    const response = await db.patch(
      `/endereco/${endereco.id}`,
      endereco.toJson()
    );
    return new Endereco(
      response.data.id,
      response.data.tipo,
      response.data.logradouro,
      response.data.numero,
      response.data.cidade,
      response.data.complemento,
      response.data.cep,
      response.data.estado
    );
  }

  async deleteEndereco(id: number) {
    await db.delete(`/endereco/${id}`);
  }
}

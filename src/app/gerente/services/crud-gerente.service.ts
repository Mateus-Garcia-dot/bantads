import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Injectable({
  providedIn: 'root'
})
export class CrudGerenteService {

  constructor() { }

  async getGerentes(): Promise<Gerente[]> {
    const response = await db.get('/gerente');
    return response.data.reduce((acc: Gerente[], gerente: any) => {
      acc.push(new Gerente(
        gerente.id,
        gerente.nome,
        gerente.cpf,
        gerente.telefone,
        gerente.clientes
      ));
      return acc;
    }, []);
  }

  async getGerente(id: number): Promise<Gerente> {
    const response = await db.get(`/gerente/${id}`);
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone,
      response.data.clientes
    );
  }

  async createGerente(gerente: Gerente): Promise<Gerente> {
    const response = await db.post('/gerente', gerente.toJson());
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone,
      response.data.clientes
    );
  }

  async updateGerente(gerente: Gerente): Promise<Gerente> {
    const response = await db.put(`/gerente/${gerente.id}`, gerente.toJson());
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone,
      response.data.clientes
    );
  }

  async deleteGerente(id: number): Promise<void> {
    await db.delete(`/gerente/${id}`);
  }
}

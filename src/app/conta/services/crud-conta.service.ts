import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Conta } from 'src/app/shared/models/conta.model';

@Injectable({
  providedIn: 'root'
})
export class CrudContaService {

  constructor(
  ) { }

  async getContas(): Promise<Conta[]> {
    const response = await db.get('/conta');
    return await response.data.reduce(async (acc: Conta[], conta: any) => {
      acc.push(new Conta(
        conta.id,
        conta.cliente,
        conta.gerente,
        conta.limite,
      ));
      return acc;
    }, []);
  }

  async getConta(id: number): Promise<Conta> {
    const response = await db.get(`/conta/${id}`);
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
    );
  }

  async createConta(conta: Conta): Promise<Conta> {
    const response = await db.post('/conta', conta.toJson());
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
    );
  }

  async updateConta(conta: Conta): Promise<Conta> {
    const response = await db.put(`/conta/${conta.id}`, conta.toJson());
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
    );
  }

  async deleteConta(id: number): Promise<void> {
    await db.delete(`/conta/${id}`);
  }

  async getContaByGerenteId(id: number): Promise<Conta[]> {
    const response = await db.get('/conta', {
      params: {
        gerente: id
      }
    });
    return await response.data.reduce(async (acc: Conta[], conta: any) => {
      acc.push(new Conta(
        conta.id,
        conta.cliente,
        conta.gerente,
        conta.limite,
      ));
      return acc;
    }, []);
  }

}

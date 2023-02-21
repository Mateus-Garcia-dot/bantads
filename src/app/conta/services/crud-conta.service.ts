import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Conta } from 'src/app/shared/models/conta.model';

@Injectable({
  providedIn: 'root',
})
export class CrudContaService {
  constructor() { }

  async getContas(): Promise<Conta[]> {
    const response = await db.get('/conta');
    const acc = [];
    for (const conta of response.data) {
      acc.push(
        new Conta(
          conta.id,
          conta.cliente,
          conta.gerente,
          conta.limite,
          conta.saldo
        )
      );
    }
    return acc;
  }

  async getConta(id: string): Promise<Conta> {
    const response = await db.get(`/conta/${id}`);
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
      response.data.saldo
    );
  }

  async createConta(conta: Conta): Promise<Conta> {
    const response = await db.post('/conta', conta.toJson());
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
      response.data.saldo
    );
  }

  async updateConta(conta: Conta): Promise<Conta> {
    const response = await db.patch(`/conta/${conta.uuid}`, conta.toJson());
    return new Conta(
      response.data.id,
      response.data.cliente,
      response.data.gerente,
      response.data.limite,
      response.data.saldo
    );
  }

  async deleteConta(id: number): Promise<void> {
    await db.delete(`/conta/${id}`);
  }

  async getContaByGerenteId(id: string): Promise<Conta[]> {
    const response = await db.get('/conta', {
      params: {
        gerente: id,
      },
    });
    const acc = [];
    for (const conta of response.data) {
      acc.push(
        new Conta(
          conta.id,
          conta.cliente,
          conta.gerente,
          conta.limite,
          conta.saldo
        )
      );
    }
    return acc;
  }
  async getContaByClienteId(id: string): Promise<Conta> {
    const response = await db.get('/conta', {
      params: {
        cliente: id,
      },
    });
    return response.data.find((conta: any) => conta.cliente === id);
  }

  async saque(contaId: string, valor: number) {
  }

  async deposito(contaId: string, valor: number) {
  }
}

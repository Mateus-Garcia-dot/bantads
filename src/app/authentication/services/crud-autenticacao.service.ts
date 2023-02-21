import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';

@Injectable({
  providedIn: 'root',
})
export class CrudAutenticacaoService {
  constructor() { }

  async getAutenticacoes(): Promise<Autenticacao[]> {
    const response = await db.get('/autenticacao');
    return response.data.reduce((acc: Autenticacao[], autenticacao: any) => {
      acc.push(
        new Autenticacao(
          autenticacao.id,
          autenticacao.login,
          undefined,
          autenticacao.tipo,
          autenticacao.isAprovada,
          autenticacao.conta
        )
      );
      return acc;
    }, []);
  }

  async getAutenticacao(id: string): Promise<Autenticacao> {
    const response = await db.get(`/auth/${id}`);
    return new Autenticacao(
      response.data.uuid,
      response.data.login,
      undefined,
      response.data.type,
      response.data.isPending,
      response.data.isApproved,
      response.data.customer
    );
  }

  async getAutenticacaoByContaAndTipo(conta: string, tipo: number) {
    const response = await db.get('/autenticacao', {
      params: {
        conta: conta,
        tipo: tipo,
      },
    });
    return response.data.find((autenticacao: any) => {
      return autenticacao.conta === conta && autenticacao.tipo === tipo;
    });
  }

  async deleteAutenticacao(id: string): Promise<void> {
    await db.delete(`/autenticacao/${id}`);
  }

  async createAutenticacao(autenticacao: Autenticacao): Promise<Autenticacao> {
    const response = await db.post('/autenticacao', autenticacao.toJson());
    return new Autenticacao(
      response.data.id,
      response.data.login,
      response.data.senha,
      response.data.tipo,
      response.data.isPending,
      response.data.isAprovada,
      response.data.conta
    );
  }

  async updateAutenticacao(autenticacao: Autenticacao): Promise<Autenticacao> {
    const response = await db.patch(
      `/autenticacao/${autenticacao.uuid}`,
      autenticacao.toJson()
    );
    return new Autenticacao(
      response.data.id,
      response.data.login,
      response.data.senha,
      response.data.tipo,
      response.data.isPending,
      response.data.isAprovada,
      response.data.conta
    );
  }

  async getPendingAutenticacoes(): Promise<Autenticacao[]> {
    const response = await db.get('/autenticacao', {
      params: {
        isPending: true,
        tipo: autenticacaoType.CLIENTE,
      },
    });
    return response.data.reduce((acc: Autenticacao[], autenticacao: any) => {
      acc.push(
        new Autenticacao(
          autenticacao.id,
          autenticacao.login,
          autenticacao.senha,
          autenticacao.tipo,
          autenticacao.isPending,
          autenticacao.isAprovada,
          autenticacao.conta
        )
      );
      return acc;
    }, []);
  }
}

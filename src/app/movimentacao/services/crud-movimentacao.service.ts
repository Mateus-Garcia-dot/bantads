import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Movimentacao } from 'src/app/shared/models/movimentacao.model';

@Injectable({
  providedIn: 'root'
})
export class CrudMovimentacaoService {

  constructor() { }

  async getMovimentacoes(): Promise<Movimentacao[]> {
    const response = await db.get('/movimentacao');
    return response.data.reduce((acc: Movimentacao[], movimentacao: any) => {
      acc.push(new Movimentacao(
        movimentacao.id,
        new Date(movimentacao.data),
        movimentacao.valor,
        movimentacao.tipo,
        movimentacao.origem,
        movimentacao.destino
      ));
      return acc;
    }, []);
  }

  async getMovimentacao(id: number): Promise<Movimentacao> {
    const response = await db.get(`/movimentacao/${id}`);
    return new Movimentacao(
      response.data.id,
      new Date(response.data.data),
      response.data.valor,
      response.data.tipo,
      response.data.origem,
      response.data.destino
    );
  }

  async createMovimentacao(movimentacao: Movimentacao): Promise<Movimentacao> {
    const response = await db.post('/movimentacao', movimentacao.toJson());
    return new Movimentacao(
      response.data.id,
      new Date(response.data.data),
      response.data.valor,
      response.data.tipo,
      response.data.origem,
      response.data.destino
    );
  }

  async updateMovimentacao(movimentacao: Movimentacao): Promise<Movimentacao> {
    const response = await db.put(`/movimentacao/${movimentacao.id}`, movimentacao.toJson());
    return new Movimentacao(
      response.data.id,
      new Date(response.data.data),
      response.data.valor,
      response.data.tipo,
      response.data.origem,
      response.data.destino
    );
  }

  async removeMovimentacao(id: number): Promise<void> {
    await db.delete(`/movimentacao/${id}`);
  }
}

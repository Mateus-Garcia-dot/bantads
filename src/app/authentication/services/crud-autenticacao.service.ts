import { Injectable } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Autenticacao } from 'src/app/shared/models/autenticacao.model';

@Injectable({
  providedIn: 'root'
})
export class CrudAutenticacaoService {

  constructor() { }
  
  async getAutenticacoes(): Promise<Autenticacao[]> {
    const response = await db.get('/autenticacao');
    return response.data.reduce((acc: Autenticacao[], autenticacao: any) => {
      acc.push(new Autenticacao(
        autenticacao.id,
        autenticacao.login,
        autenticacao.senha,
        autenticacao.tipo,
        autenticacao.conta,
      ))
      return acc
    }, []);
  }

  async getAutenticacao(id: number): Promise<Autenticacao> {
    const response = await db.get(`/autenticacao/${id}`);
    return new Autenticacao(
      response.data.id,
      response.data.login,
      response.data.senha,
      response.data.tipo,
      response.data.conta,
    );
  }

  async createAutenticacao(autenticacao: Autenticacao): Promise<Autenticacao> {
    const response = await db.post('/autenticacao', autenticacao.toJson());
    return new Autenticacao(
      response.data.id,
      response.data.login,
      response.data.senha,
      response.data.tipo,
      response.data.conta,
    );
  }

  async updateAutenticacao(autenticacao: Autenticacao): Promise<Autenticacao> {
    const response = await db.put(`/autenticacao/${autenticacao.id}`, autenticacao.toJson());
    return new Autenticacao(
      response.data.id,
      response.data.login,
      response.data.senha,
      response.data.tipo,
      response.data.conta,
    );
  }
}
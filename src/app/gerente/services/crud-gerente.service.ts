import { Injectable } from '@angular/core';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import db from 'src/app/shared/database/database';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Injectable({
  providedIn: 'root',
})
export class CrudGerenteService {
  constructor(private contaService: CrudContaService) {}

  async getGerentes(): Promise<Gerente[]> {
    const response = await db.get('/gerente');
    console.log(response);
    return response.data.reduce((acc: Gerente[], gerente: any) => {
      acc.push(
        new Gerente(gerente.id, gerente.nome, gerente.cpf, gerente.telefone)
      );
      return acc;
    }, []);
  }

  async getGerente(id: number): Promise<Gerente> {
    const response = await db.get(`/gerente/${id}`);
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone
    );
  }

  async createGerente(gerente: Gerente): Promise<Gerente> {
    const response = await db.post('/gerente', gerente.toJson());
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone
    );
  }

  async updateGerente(gerente: Gerente): Promise<Gerente> {
    const response = await db.patch(`/gerente/${gerente.id}`, gerente.toJson());
    return new Gerente(
      response.data.id,
      response.data.nome,
      response.data.cpf,
      response.data.telefone
    );
  }

  async deleteGerente(id: number): Promise<void> {
    await db.delete(`/gerente/${id}`);
  }

  async getGerenteWithLessClientes() {
    const gerentes = await this.getGerentes();
    if (gerentes.length === 0) return null;
    const conta = [];
    for (let gerente of gerentes) {
      conta.push([
        gerente,
        (await this.contaService.getContaByGerenteId(gerente.id!)).length,
      ]);
    }
    conta.sort((a: any, b: any) => a[1] - b[1]);
    return conta[0][0] as Gerente;
  }
}

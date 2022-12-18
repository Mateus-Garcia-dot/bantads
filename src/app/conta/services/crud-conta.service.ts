import { Injectable } from '@angular/core';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import db from 'src/app/shared/database/database';
import { Conta } from 'src/app/shared/models/conta.model';

@Injectable({
  providedIn: 'root'
})
export class CrudContaService {

  constructor(
    private crudGerenteService: CrudGerenteService,
    private  crudClienteService: CrudClienteService
  ) { }

  async getContas(): Promise<Conta[]> {
    const response = await db.get('/conta');
    return await response.data.reduce(async (acc: Conta[], conta: any) => {
      acc.push(new Conta(
        conta.id,
        await this.crudClienteService.getCliente(conta.cliente),
        await this.crudGerenteService.getGerente(conta.gerente),
        conta.limite,
        conta.movimentacoes
      ));
      return acc;
    }, []);
  }

  async getConta(id: number): Promise<Conta> {
    const response = await db.get(`/conta/${id}`);
    return new Conta(
      response.data.id,
      await this.crudClienteService.getCliente(response.data.cliente),
      await this.crudGerenteService.getGerente(response.data.gerente),
      response.data.limite,
      response.data.movimentacoes
    );
  }

  async createConta(conta: Conta): Promise<Conta> {
    const response = await db.post('/conta', conta.toJson());
    return new Conta(
      response.data.id,
      await this.crudClienteService.getCliente(response.data.cliente),
      await this.crudGerenteService.getGerente(response.data.gerente),
      response.data.limite,
      response.data.movimentacoes
    );
  }

  async updateConta(conta: Conta): Promise<Conta> {
    const response = await db.put(`/conta/${conta.id}`, conta.toJson());
    return new Conta(
      response.data.id,
      await this.crudClienteService.getCliente(response.data.cliente),
      await this.crudGerenteService.getGerente(response.data.gerente),
      response.data.limite,
      response.data.movimentacoes
    );
  }

  async deleteConta(id: number): Promise<void> {
    await db.delete(`/conta/${id}`);
  }
}

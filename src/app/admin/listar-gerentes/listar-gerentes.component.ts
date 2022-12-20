import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Component({
  selector: 'app-listar-gerentes',
  templateUrl: './listar-gerentes.component.html',
  styleUrls: ['./listar-gerentes.component.scss'],
})
export class ListarGerentesComponent implements OnInit {
  gerentes!: Gerente[];
  autenticacao: Autenticacao[] = [];

  constructor(
    private crudGerente: CrudGerenteService,
    private crudAutenticacao: CrudAutenticacaoService,
    private crudConta: CrudContaService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.gerentes = await this.crudGerente.getGerentes();
    for (let gerente of this.gerentes) {
      let auth = await this.crudAutenticacao.getAutenticacaoByContaAndTipo(
        gerente.id!,
        autenticacaoType.GERENTE
      );
      this.autenticacao.push(auth);
    }
  }

  async distributeHangingContas() {
    const contas = await this.crudConta.getContas();
    const hangingContas = await Promise.all(
      contas.filter(async conta => {
        return await this.crudGerente.getGerente(conta.gerente!);
      })
    );
    for (let conta of hangingContas) {
      const gerente = await this.crudGerente.getGerenteWithLessClientes();
      if (gerente) {
        conta.gerente = gerente.id;
        await this.crudConta.updateConta(conta);
      }
    }
  }

  async deleteGerente(id: number) {
    const autenticacao = await this.crudAutenticacao.getAutenticacao(id);
    const gerente = await this.crudGerente.getGerente(autenticacao.conta!);
    await this.crudAutenticacao.deleteAutenticacao(autenticacao.id!);
    await this.crudGerente.deleteGerente(gerente.id!);
    await this.distributeHangingContas();
    this.ngOnInit();
  }
}

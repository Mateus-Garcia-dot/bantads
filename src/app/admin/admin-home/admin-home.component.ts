import { Component, OnInit } from '@angular/core';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  gerentes!: Gerente[];

  positiveBalances = [0];
  negativeBalances = [0];

  constructor(
    private crudGerentes: CrudGerenteService,
    private crudContas: CrudContaService
  ) {}

  async ngOnInit() {
    this.gerentes = await this.crudGerentes.getGerentes();
    console.log(this.gerentes);
    this.positiveBalances = await Promise.all(
      this.gerentes.map(gerente => this.sumPositiveBalance(gerente))
    );
    this.negativeBalances = await Promise.all(
      this.gerentes.map(gerente => this.sumNegativeBalance(gerente))
    );
  }

  async sumNegativeBalance(gerente: Gerente) {
    const contas = await this.crudContas.getContaByGerenteId(gerente.id!);
    return contas.reduce(
      (acc, conta) => (conta.saldo! < 0 ? acc + conta.saldo! : 0),
      0
    );
  }

  async sumPositiveBalance(gerente: Gerente) {
    const contas = await this.crudContas.getContaByGerenteId(gerente.id!);
    return contas.reduce(
      (acc, conta) => (conta.saldo! >= 0 ? acc + conta.saldo! : acc),
      0
    );
  }
}

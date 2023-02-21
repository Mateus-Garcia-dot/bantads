import { Component, OnInit } from '@angular/core';
import db from 'src/app/shared/database/database';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  gerentes!: Gerente[];

  positiveBalances!: Array<number>;
  negativeBalances!: Array<number>;
  qntClientes!: Array<number>;

  constructor() { }

  async ngOnInit() {
    this.gerentes = []
    this.positiveBalances = [];
    this.negativeBalances = [];
    this.qntClientes = [];
    const datas = await db.get('/manager/account');
    for (let data of datas.data) {
      this.gerentes.push(new Gerente(data.uuid, data.name, data.cpf, data.telephone, data.authentication))
      this.positiveBalances.push(data.sumPositiveBalance);
      this.negativeBalances.push(data.sumNegativeBalance)
      this.qntClientes.push(data.count)
    }
  }
}

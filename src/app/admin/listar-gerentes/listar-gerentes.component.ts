import { Component, OnInit } from '@angular/core';
import db from 'src/app/shared/database/database';
import {
  Autenticacao,
} from 'src/app/shared/models/autenticacao.model';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Component({
  selector: 'app-listar-gerentes',
  templateUrl: './listar-gerentes.component.html',
  styleUrls: ['./listar-gerentes.component.scss'],
})
export class ListarGerentesComponent implements OnInit {
  gerentes: Gerente[] = [];
  autenticacao: Autenticacao[] = [];

  constructor() { }

  async ngOnInit() {
    this.gerentes = [];
    const data = await db.get<Gerente[]>('/manager');
    for (let manager of data.data) {
      this.gerentes.push(new Gerente(
        manager.uuid,
        manager.name,
        manager.cpf,
        manager.telephone
      ));
      this.autenticacao.push(new Autenticacao(
        manager.authentication!.uuid,
        manager.authentication!.login,
        manager.authentication!.password,
      ))
    }
  }

  async deleteGerente(id: string) {
    await db.delete('/manager/' + id);
    this.ngOnInit();
  }
}

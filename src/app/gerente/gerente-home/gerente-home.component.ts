import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/app/shared/models/gerente.model';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudGerenteService } from '../services/crud-gerente.service';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss'],
})
export class GerenteHomeComponent implements OnInit {
  gerente = new Gerente();

  constructor(
    private loginService: LoginService,
    private crudGerente: CrudGerenteService,
    private autenticacao: CrudAutenticacaoService
  ) { }

  async ngOnInit() {
    const autenticacaoId = this.loginService.getAutenticacaoId();
    const autenticacao = await this.autenticacao.getAutenticacao(
      autenticacaoId
    );
    this.gerente = await this.crudGerente.getGerente(autenticacao.customer!);
  }
}

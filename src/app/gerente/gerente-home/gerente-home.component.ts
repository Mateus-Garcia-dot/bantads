import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/app/shared/models/gerente.model';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudGerenteService } from '../services/crud-gerente.service';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.scss']
})
export class GerenteHomeComponent implements OnInit {

  gerente = new Gerente()

  constructor(
    private loginService: LoginService,
    private crudGerente: CrudGerenteService
  ) { }

  async ngOnInit()  {
    const contaId = this.loginService.getContaId() 
    this.gerente = await this.crudGerente.getGerente(contaId) 
  }

}

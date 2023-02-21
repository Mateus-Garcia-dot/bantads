import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UnsubscriptionError } from 'rxjs';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import db from 'src/app/shared/database/database';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';
import { Gerente } from 'src/app/shared/models/gerente.model';

@Component({
  selector: 'app-inserir-editar-gerente',
  templateUrl: './inserir-editar-gerente.component.html',
  styleUrls: ['./inserir-editar-gerente.component.scss'],
})
export class InserirEditarGerenteComponent implements OnInit {
  @ViewChild('formEditAdd') formEditAdd!: NgForm;

  autenticacao = new Autenticacao();
  gerente = new Gerente();
  senha = '';
  id!: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private crudAuth: CrudAutenticacaoService,
    private crudGerente: CrudGerenteService,
    private crudConta: CrudContaService
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.id = id;
      if (id != null || id != undefined) {
        const gerente = (await db.get<Gerente>('/manager/' + id)).data;
        this.gerente = new Gerente(gerente.uuid, gerente.name, gerente.cpf, gerente.telephone);
        this.autenticacao = new Autenticacao(gerente.authentication?.uuid, gerente.authentication?.login, gerente.authentication?.password, gerente.authentication?.type, gerente.authentication?.isPending, gerente.authentication?.isApproved, gerente.authentication?.customer);
      }
    });
  }

  async onCreate() {
    if (!this.formEditAdd.valid) {
      this.formEditAdd.control.markAllAsTouched();
    }
    if (!this.autenticacao.uuid) {
      const gerenteNew = await db.post('/manager', {
        ...this.gerente.toJson(),
        authentication: {
          ...this.autenticacao.toJson(),
          password: this.senha
        },
      });
    }
    this.router.navigate(['/admin/home']);
  }

  async onUpdate() {
    if (!this.formEditAdd.valid) {
      this.formEditAdd.control.markAllAsTouched();
    }
    db.patch('/manager/' + this.id, {
      name: this.gerente.name,
      cpf: this.gerente.cpf,
      telephone: this.gerente.telephone,
      authentication: {
        login: this.autenticacao.login,
        password: !this.senha ? undefined : this.senha
      },
    })
    this.router.navigate(['/admin/home']);
  }

}

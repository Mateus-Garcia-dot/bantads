import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
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
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      this.id = id;
      if (id !== null || id !== undefined) {
        console.log(id);
        this.autenticacao = await this.crudAuth.getAutenticacao(Number(id));
        this.gerente = await this.crudGerente.getGerente(
          this.autenticacao.conta!
        );
      }
    });
  }

  async onCreate() {
    if (!this.formEditAdd.valid) {
      this.formEditAdd.control.markAllAsTouched();
    }
    if (!this.autenticacao.id) {
      const gerenteNew = await this.crudGerente.createGerente(this.gerente);
      this.autenticacao.conta = gerenteNew.id;
      this.autenticacao.senha = this.senha;
      this.autenticacao.tipo = autenticacaoType.GERENTE;
      const autenticacaoNew = await this.crudAuth.createAutenticacao(
        this.autenticacao
      );
    }
    await this.distributeHangingContas();
    this.router.navigate(['/admin/home']);
  }

  async onUpdate() {
    if (!this.formEditAdd.valid) {
      this.formEditAdd.control.markAllAsTouched();
    }
    const gerenteNew = await this.crudGerente.updateGerente(this.gerente);
    const autenticacaoNew = await this.crudAuth.updateAutenticacao(
      this.autenticacao
    );
    await this.distributeHangingContas();
    this.router.navigate(['/admin/home']);
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
}

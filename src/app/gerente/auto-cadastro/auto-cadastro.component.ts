import { Component, OnInit } from '@angular/core';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import db from 'src/app/shared/database/database';
import { Autenticacao } from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-auto-cadastro',
  templateUrl: './auto-cadastro.component.html',
  styleUrls: ['./auto-cadastro.component.scss'],
})
export class AutoCadastroComponent implements OnInit {
  public pendingAprovalAccount!: Autenticacao[];
  public pendingAprovalClientes!: Cliente[];

  constructor() { }

  async ngOnInit() {
    this.pendingAprovalAccount = []
    this.pendingAprovalClientes = []
    const data = await db.get('/auth/pending');
    for (let auth of data.data) {
      this.pendingAprovalClientes.push(new Cliente(
        auth.uuid,
        auth.name,
        auth.cpf,
        auth.address,
        auth.phone,
        auth.salary
      ))
      this.pendingAprovalAccount.push(new Autenticacao(
        auth.authentication.uuid,
        auth.authentication.login,
        auth.authentication.password,
        auth.authentication.isPending,
        auth.authentication.isApproved
      ));
    }
  }

  async aprovarAutenticacao(id: string) {
    await db.post('/auth/approve/' + id);
    this.ngOnInit();
  }

  async reprovarAutenticacao(id: string) {
    await db.post('/auth/reject/' + id)
    this.ngOnInit();
  }
}

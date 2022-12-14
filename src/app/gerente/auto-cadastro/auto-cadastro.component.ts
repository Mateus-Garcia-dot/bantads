import { Component, OnInit } from '@angular/core';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
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

  constructor(
    private crudConta: CrudContaService,
    private crudAutenticacao: CrudAutenticacaoService,
    private crudCliente: CrudClienteService
  ) {}

  async ngOnInit() {
    this.pendingAprovalAccount =
      await this.crudAutenticacao.getPendingAutenticacoes();
    this.pendingAprovalClientes = await Promise.all(
      this.pendingAprovalAccount.map(async autenticacao => {
        const conta = await this.crudConta.getConta(autenticacao.conta!);
        return await this.crudCliente.getCliente(conta.cliente!);
      })
    );
  }

  async aprovarAutenticacao(id: number) {
    const auth = await this.crudAutenticacao.getAutenticacao(id);
    auth.senha = Math.random().toString(36).slice(-8);
    auth.isPending = false;
    auth.isAprovada = true;
    await this.crudAutenticacao.updateAutenticacao(auth);
    this.ngOnInit();
  }

  async reprovarAutenticacao(id: number) {
    const auth = await this.crudAutenticacao.getAutenticacao(id);
    auth.isPending = false;
    auth.isAprovada = true;
    await this.crudAutenticacao.updateAutenticacao(auth);
    this.ngOnInit();
  }
}

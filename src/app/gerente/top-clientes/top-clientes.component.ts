import { Component, OnInit } from '@angular/core';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Conta } from 'src/app/shared/models/conta.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-top-clientes',
  templateUrl: './top-clientes.component.html',
  styleUrls: ['./top-clientes.component.scss'],
})
export class TopClientesComponent implements OnInit {
  mesh: {
    conta: Conta;
    cliente: Cliente;
    endereco: Endereco;
    autenticacao: Autenticacao;
  }[] = [];

  constructor(
    private crudContas: CrudContaService,
    private crudCliente: CrudClienteService,
    private crudEndereco: CrudEnderecoService,
    private crudAutenticacao: CrudAutenticacaoService
  ) {}

  async ngOnInit() {
    const contas = await this.crudContas.getContas();
    for (const conta of contas) {
      const cliente = await this.crudCliente.getCliente(conta.cliente!);
      const endereco = await this.crudEndereco.getEndereco(cliente.endereco!);
      const auth = await this.crudAutenticacao.getAutenticacaoByContaAndTipo(
        conta.id!,
        autenticacaoType.CLIENTE
      );
      this.mesh.push({
        conta,
        cliente,
        endereco,
        autenticacao: auth,
      });
    }
    this.mesh.sort((a, b) => {
      return b.conta.saldo! - a.conta.saldo!;
    });
    this.mesh = this.mesh.slice(0, 5);
  }
}

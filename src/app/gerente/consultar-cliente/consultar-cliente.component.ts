import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-consultar-cliente',
  templateUrl: './consultar-cliente.component.html',
  styleUrls: ['./consultar-cliente.component.scss'],
})
export class ConsultarClienteComponent implements OnInit {
  mesh: {
    conta: Conta;
    cliente: Cliente;
    endereco: Endereco;
    autenticacao: Autenticacao;
  }[] = [];
  nome = '';

  constructor(
    private crudContas: CrudContaService,
    private crudCliente: CrudClienteService,
    private crudEndereco: CrudEnderecoService,
    private crudAutenticacao: CrudAutenticacaoService
  ) {}

  ngOnInit() {
    return;
  }

  async onSearch() {
    this.mesh = [];
    const clientes = await this.crudCliente.getClienteByName(this.nome);
    for (let cliente of clientes) {
      const conta = await this.crudContas.getContaByClienteId(cliente.id!);
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
      return a.cliente.nome?.localeCompare(b.cliente.nome!)!;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import db from 'src/app/shared/database/database';
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
  ) { }

  async ngOnInit() {
    const customersResponse = (await db.get('/customer/top')).data;
    for (const customerResponse of customersResponse) {
      const conta = new Conta(customersResponse.account?.uuid, customerResponse.account?.customer, customerResponse.account?.manager, customerResponse.account?.limitAmount, customerResponse.account?.balance);
      const cliente = new Cliente(customerResponse.uuid, customerResponse.name, customerResponse.cpf, customerResponse.address, customerResponse.phone, customerResponse.salary);
      const endereco = new Endereco(customerResponse.address.uuid, customerResponse.address.type, customerResponse.address.street, customerResponse.address.number, customerResponse.address.city, customerResponse.address.complement, customerResponse.address.cep, customerResponse.address.state);
      const auth = new Autenticacao(customerResponse.authentication.uuid, customerResponse.authentication.login, customerResponse.authentication.password, customerResponse.authentication.isPending, customerResponse.authentication.isApproved);
      this.mesh.push({
        conta,
        cliente,
        endereco,
        autenticacao: auth,
      });
    }
  }
}

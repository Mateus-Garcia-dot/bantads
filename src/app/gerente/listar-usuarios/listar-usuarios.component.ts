import { Component, OnInit } from '@angular/core';
import { AuthenticationModule } from 'src/app/authentication/authentication.module';
import { LoginService } from 'src/app/authentication/services/login.service';
import db from 'src/app/shared/database/database';
import {
  Autenticacao,
} from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Conta } from 'src/app/shared/models/conta.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.scss'],
})
export class ListarUsuariosComponent implements OnInit {
  mesh: {
    conta: Conta;
    cliente: Cliente;
    endereco: Endereco;
    autenticacao: Autenticacao;
  }[] = [];

  constructor(private LoginService: LoginService) {
  }

  async ngOnInit() {
    const customersResponse = (await db.get('/customer/manager/' + this.LoginService.getCustumerId())).data;
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
    this.mesh.sort((a, b) => {
      return a.cliente.name?.localeCompare(b.cliente.name!)!;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { LoginService } from 'src/app/authentication/services/login.service';
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

  constructor(
    private crudContas: CrudContaService,
    private crudCliente: CrudClienteService,
    private crudEndereco: CrudEnderecoService,
    private crudAutenticacao: CrudAutenticacaoService,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    const authGerenteId = this.loginService.getAutenticacaoId();
    const getAuthGerent = await this.crudAutenticacao.getAutenticacao(
      authGerenteId
    );
    const contas = await this.crudContas.getContaByGerenteId(
      getAuthGerent.conta!
    );
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
      return a.cliente.nome?.localeCompare(b.cliente.nome!)!;
    });
  }
}

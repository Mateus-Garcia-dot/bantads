import { Injectable } from '@angular/core';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import {
  Autenticacao,
  autenticacaoType,
} from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { CrudAutenticacaoService } from './crud-autenticacao.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { Conta } from 'src/app/shared/models/conta.model';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private crudClienteService: CrudClienteService,
    private crudEnderecoService: CrudEnderecoService,
    private crudAutenticacaoService: CrudAutenticacaoService,
    private crudContaService: CrudContaService,
    private crudGerenteService: CrudGerenteService
  ) {}

  async register(
    cliente: Cliente,
    endereco: Endereco,
    autenticacao: Autenticacao
  ) {
    const enderecoNew = await this.crudEnderecoService.createEndereco(endereco);
    cliente.endereco = enderecoNew.id;

    const clienteNew = await this.crudClienteService.createCliente(cliente);

    const conta = new Conta();
    conta.cliente = clienteNew.id;
    conta.saldo = 0;
    conta.gerente =
      (await this.crudGerenteService.getGerenteWithLessClientes())?.id ||
      undefined;
    conta.limite = clienteNew.salario! >= 2000 ? clienteNew.salario! / 2 : 0;
    const contaNew = await this.crudContaService.createConta(conta);

    autenticacao.conta = contaNew.id;
    autenticacao.isPending = true;
    autenticacao.tipo = autenticacaoType.CLIENTE;
    const autenticacaoNew =
      await this.crudAutenticacaoService.createAutenticacao(autenticacao);
  }
}

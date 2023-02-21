import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { CrudClienteService } from '../services/crud-cliente.service';
import { Autenticacao } from 'src/app/shared/models/autenticacao.model';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import db from 'src/app/shared/database/database';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.scss'],
})
export class EditarClienteComponent implements OnInit {
  @ViewChild('formEdit') formEdit!: NgForm;

  senha = '';
  cliente = new Cliente();
  endereco = new Endereco();
  autenticacao = new Autenticacao();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private crudCliente: CrudClienteService,
    private crudAuth: CrudAutenticacaoService,
    private crudEndereco: CrudEnderecoService,
    private crudConta: CrudContaService
  ) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idCliente = params.get('id');
      const customerResponse = (await db.get('/customer/' + idCliente)).data;
      this.cliente = new Cliente(customerResponse.uuid, customerResponse.name, customerResponse.cpf, customerResponse.address, customerResponse.phone, customerResponse.salary);
      this.endereco = new Endereco(customerResponse.address.uuid, customerResponse.address.type, customerResponse.address.street, customerResponse.address.number, customerResponse.address.city, customerResponse.address.complement, customerResponse.address.cep, customerResponse.address.state);
      this.autenticacao = new Autenticacao(customerResponse.authentication.uuid, customerResponse.authentication.login, customerResponse.authentication.password, customerResponse.authentication.isPending, customerResponse.authentication.isApproved);
    });
  }

  async onSubmit() {
    if (!this.formEdit.valid) {
      this.formEdit.control.markAllAsTouched();
      return;
    }
    db.put('/customer/' + this.cliente.uuid, {
      ...this.cliente.toJson(),
      address: this.endereco.toJson(),
      authentication: {
        login: this.autenticacao.login,
        password: this.autenticacao.password,
      }
    })
    this.router.navigate(['/']);
  }
}

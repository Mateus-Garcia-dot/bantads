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
import { Conta } from 'src/app/shared/models/conta.model';

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
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const idCliente = params.get('id');
      this.autenticacao = await this.crudAuth.getAutenticacao(
        Number(idCliente)
      );
      this.cliente = await this.crudCliente.getCliente(
        this.autenticacao.conta!
      );
      this.endereco = await this.crudEndereco.getEndereco(
        this.cliente.endereco!
      );
    });
  }

  async onSubmit() {
    if (!this.formEdit.valid) {
      this.formEdit.control.markAllAsTouched();
      return;
    }
    const autenticacaoNew = await this.crudAuth.updateAutenticacao(
      this.autenticacao
    );
    const clienteNew = await this.crudCliente.updateCliente(this.cliente);
    await this.crudEndereco.updateEndereco(this.endereco);

    const conta = new Conta();
    conta.id = autenticacaoNew.conta!;
    conta.limite = clienteNew.salario! >= 2000 ? clienteNew.salario! / 2 : 0;
    await this.crudConta.updateConta(conta);

    this.router.navigate(['/']);
  }
}

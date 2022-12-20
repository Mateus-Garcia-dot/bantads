import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { CrudClienteService } from 'src/app/cliente/services/crud-cliente.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { CrudEnderecoService } from 'src/app/endereco/services/crud-endereco.service';
import { Autenticacao } from 'src/app/shared/models/autenticacao.model';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Conta } from 'src/app/shared/models/conta.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styleUrls: ['./mostrar-usuario.component.scss'],
})
export class MostrarUsuarioComponent implements OnInit {
  endereco!: Endereco;
  cliente!: Cliente;
  conta!: Conta;
  autenticacao!: Autenticacao;

  constructor(
    private crudEndereco: CrudEnderecoService,
    private crudCliente: CrudClienteService,
    private crudConta: CrudContaService,
    private crudAutenticacao: CrudAutenticacaoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id) {
        this.autenticacao = await this.crudAutenticacao.getAutenticacao(
          Number(id)
        );
        this.conta = await this.crudConta.getConta(this.autenticacao.conta!);
        this.cliente = await this.crudCliente.getCliente(this.conta.cliente!);
        this.endereco = await this.crudEndereco.getEndereco(
          this.cliente.endereco!
        );
      }
    });
  }

  onSubmit() {
    this.router.navigate(['/gerente/cliente/listar']);
  }
}

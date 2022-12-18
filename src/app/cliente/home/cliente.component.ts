import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { CrudClienteService } from '../services/crud-cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente!: Cliente | null

  constructor(
    public crudAuth: LoginService,
    private crudConta: CrudContaService,
    private crudCliente: CrudClienteService
  ) { }

  async ngOnInit() {
    const contaId = this.crudAuth.getContaId()
    const conta = await this.crudConta.getConta(contaId)
    this.cliente = await this.crudCliente.getCliente(conta.cliente!)
  }

}

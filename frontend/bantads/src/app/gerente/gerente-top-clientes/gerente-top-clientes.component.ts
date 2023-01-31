import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/shared/models/cliente.model';

@Component({
  selector: 'app-gerente-top-clientes',
  templateUrl: './gerente-top-clientes.component.html',
  styleUrls: ['./gerente-top-clientes.component.css']
})
export class GerenteTopClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.listarTodos().subscribe(clientes => {
      this.clientes = clientes
      .sort((cliente: Cliente, cliente2: Cliente) => cliente2.conta!.saldo - cliente.conta!.saldo)
      .slice(0, 5);
    })   
  }

}

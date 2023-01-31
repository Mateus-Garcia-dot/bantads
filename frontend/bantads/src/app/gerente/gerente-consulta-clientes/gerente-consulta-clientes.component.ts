import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/shared/models/cliente.model';

@Component({
  selector: 'app-gerente-consulta-clientes',
  templateUrl: './gerente-consulta-clientes.component.html',
  styleUrls: ['./gerente-consulta-clientes.component.css']
})
export class GerenteConsultaClientesComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.clienteService.listarTodos().subscribe(clientes => {
      this.clientes = clientes.sort((cliente: Cliente, cliente2: Cliente) => cliente.nome!.localeCompare(cliente2.nome!));
    })
  }

}

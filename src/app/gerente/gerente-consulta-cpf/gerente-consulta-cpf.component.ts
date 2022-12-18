import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/shared/models/cliente.model';

@Component({
  selector: 'app-gerente-consulta-cpf',
  templateUrl: './gerente-consulta-cpf.component.html',
  styleUrls: ['./gerente-consulta-cpf.component.css']
})
export class GerenteConsultaCpfComponent implements OnInit {

  cpf: string = "";
  cliente?: Cliente;

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {}

  buscar() {
   this.clienteService.buscarClientePorCpf(this.cpf).subscribe(cliente => {
    this.cliente = cliente[0];
  })
  }

}

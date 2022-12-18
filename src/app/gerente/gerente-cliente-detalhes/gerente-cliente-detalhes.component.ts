import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/shared/models/cliente.model';

@Component({
  selector: 'app-gerente-cliente-detalhes',
  templateUrl: './gerente-cliente-detalhes.component.html',
  styleUrls: ['./gerente-cliente-detalhes.component.css'],
})
export class GerenteClienteDetalhesComponent implements OnInit {
  
  @Input() clienteId?: number;
  cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'] || this.clienteId!;

    this.clienteService.buscarClientePorId(id).subscribe(c => {
      this.cliente = c;
      console.log(this.cliente)
    })

  }
}

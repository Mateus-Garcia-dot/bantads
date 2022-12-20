import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ContaService } from 'src/app/cliente/services/conta.service';
import { Cliente } from 'src/shared/models/cliente.model';

@Component({
  selector: 'app-gerente-cliente-detalhes',
  templateUrl: './gerente-cliente-detalhes.component.html',
  styleUrls: ['./gerente-cliente-detalhes.component.css'],
})
export class GerenteClienteDetalhesComponent implements OnInit {
  
  @Input() clienteId?: number;
  @Input() cliente!: Cliente;

  constructor(
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    console.log(this.clienteId)
    let id = +this.route.snapshot.params['id'] || this.clienteId!;
    this.clienteService
    .buscarClientePorId(id)
    .pipe(switchMap(cliente => {
      this.cliente = cliente
      return this.contaService.buscarContaPorCliente(this.cliente.id)
    }
    ))
    .subscribe(conta => {
      console.log(conta)
      this.cliente!.conta = conta[0];
    })

  }
}

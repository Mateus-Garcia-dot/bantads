import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/shared/models/cliente.model';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGerenteComponent } from '../modal-gerente/modal-gerente.component';
import { ContaService } from 'src/app/cliente/services/conta.service';
import { Conta } from 'src/shared/models/conta.model';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.css'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: Cliente[] = [];
  contas: Conta[] = [];

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private modalServie: NgbModal
  ) {}

  ngOnInit(): void {
    this.buscarTodosClientesAprovacaoPendente()
  }

  buscarTodosClientesAprovacaoPendente() {
    this.contaService.listarTodas().subscribe(contas => {
      this.contas = contas.filter(c => c.pendenteAprovacao);
    });

    return this.clienteService
      .listarTodos()
      .subscribe(clientes => {
        this.clientes = clientes;
        clientes.map((cliente) => {
          cliente.conta = this.contas.find(conta => conta.cliente?.id == cliente.id)
        })
        this.clientes = clientes.filter(c => c.conta?.pendenteAprovacao)
      })
  }

  aprovarConta(cliente: Cliente) {
    this.clienteService.aprovarCadastro(cliente).subscribe(() => this.buscarTodosClientesAprovacaoPendente());
  }

  recusarConta(cliente: Cliente) {
    const modalRef = this.abrirModalGerente(cliente);
    modalRef.result.then((recusado) => {
      if (recusado) {
        this.clienteService.recusarCadastro(cliente).subscribe(() => this.buscarTodosClientesAprovacaoPendente());
      }
    });
  }

  abrirModalGerente(cliente: Cliente) {
    const modalRef = this.modalServie.open(ModalGerenteComponent);
    modalRef.componentInstance.cliente = cliente;
    return modalRef;
  }
}

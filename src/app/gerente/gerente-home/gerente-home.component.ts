import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/shared/models/cliente.model';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalGerenteComponent } from '../modal-gerente/modal-gerente.component';

@Component({
  selector: 'app-gerente-home',
  templateUrl: './gerente-home.component.html',
  styleUrls: ['./gerente-home.component.css'],
})
export class GerenteHomeComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private modalServie: NgbModal
  ) {}

  ngOnInit(): void {
    // this.buscarTodosClientesAprovacaoPendente()
  }

  // buscarTodosClientesAprovacaoPendente(): Cliente[] {
  //   return this.clienteService
  //     .listarTodos()
  //     .filter((cliente) => cliente.conta?.pendenteAprovacao);
  // }

  // buscarClientePorCpf(cpf: string): Cliente | undefined {
  //   return this.clienteService.buscarClientePorCpf(cpf);
  // }

  aprovarConta(cliente: Cliente) {
  //   this.clienteService.aprovarCadastro(cliente);
  //   this.clientes = this.buscarTodosClientesAprovacaoPendente();
  }

  recusarConta(cliente: Cliente) {
  //   const modalRef = this.abrirModalGerente(cliente);
  //   modalRef.result.then((recusado) => {
  //     if (recusado) {
  //       this.clienteService.recusarCadastro(cliente);
  //       this.clientes = this.buscarTodosClientesAprovacaoPendente();
  //     }
  //   });
  }

  abrirModalGerente(cliente: Cliente) {
    const modalRef = this.modalServie.open(ModalGerenteComponent);
    modalRef.componentInstance.cliente = cliente;
    return modalRef;
  }
}

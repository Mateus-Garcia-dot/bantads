import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { Cliente } from 'src/shared/models/cliente.model';
import { MotivoCadastroRecusado } from 'src/shared/models/motivo-cadastro-recusado.model';

@Component({
  selector: 'app-modal-gerente',
  templateUrl: './modal-gerente.component.html',
  styleUrls: ['./modal-gerente.component.css']
})
export class ModalGerenteComponent implements OnInit {

  @Input() cliente?: Cliente;

  @ViewChild('formSolicitacao') formSolicitacao!: NgForm;
  motivoCadastroRecusado: MotivoCadastroRecusado = new MotivoCadastroRecusado();

  constructor(
    public activeModal :  NgbActiveModal,
    private clienteService: ClienteService
    ) { }

  ngOnInit(): void {  }

  recusarSolicitacao() {
    this.activeModal.close(true);
  }
}

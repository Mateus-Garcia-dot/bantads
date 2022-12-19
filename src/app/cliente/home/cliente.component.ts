import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { CrudClienteService } from '../services/crud-cliente.service';
import { Conta } from 'src/app/shared/models/conta.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalDepositoComponent } from '../modal-deposito/modal-deposito.component';
import { ModalSaqueComponent } from '../modal-saque/modal-saque.component';
import { ModalTransferenciaComponent } from '../modal-transferencia/modal-transferencia.component';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  cliente!: Cliente | null;
  conta!: Conta | null;

  constructor(
    public crudAuth: LoginService,
    private crudConta: CrudContaService,
    private crudCliente: CrudClienteService,
    public matDialog: MatDialog,
    public autenticacaoService: CrudAutenticacaoService
  ) {}

  async ngOnInit() {
    const autenticacaoId = this.crudAuth.getAutenticacaoId();
    const autenticacao = await this.autenticacaoService.getAutenticacao(
      autenticacaoId
    );
    this.conta = await this.crudConta.getConta(autenticacao.conta!);
    this.cliente = await this.crudCliente.getCliente(this.conta.cliente!);
  }

  openDepositoModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(
      ModalDepositoComponent,
      dialogConfig
    );
  }

  openSaqueModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(ModalSaqueComponent, dialogConfig);
  }

  openTransferenciaModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(
      ModalTransferenciaComponent,
      dialogConfig
    );
  }
}

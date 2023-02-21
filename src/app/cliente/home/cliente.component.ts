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
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import db from 'src/app/shared/database/database';

registerLocaleData(localePt);
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
    public matDialog: MatDialog,
    public autenticacaoService: CrudAutenticacaoService
  ) { }

  async ngOnInit() {
    const autenticacaoId = this.crudAuth.getCustumerId()
    console.log(autenticacaoId)
    const customerResponse = (await db.get('/customer/' + autenticacaoId)).data
    const conta = new Conta(customerResponse.account?.uuid, customerResponse.account?.customer, customerResponse.account?.manager, customerResponse.account?.limitAmount, customerResponse.account?.balance);
    const cliente = new Cliente(customerResponse.uuid, customerResponse.name, customerResponse.cpf, customerResponse.address, customerResponse.phone, customerResponse.salary);
    this.cliente = cliente;
    this.conta = conta;
  }

  openDepositoModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(
      ModalDepositoComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openSaqueModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(ModalSaqueComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  openTransferenciaModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.panelClass = 'custom-dialog-container';
    const modalDialog = this.matDialog.open(
      ModalTransferenciaComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}

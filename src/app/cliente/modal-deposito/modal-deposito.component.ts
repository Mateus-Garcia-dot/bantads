import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';

@Component({
  selector: 'app-modal-deposito',
  templateUrl: './modal-deposito.component.html',
  styleUrls: ['./modal-deposito.component.scss'],
})
export class ModalDepositoComponent implements OnInit {
  @ViewChild('formDeposito') formDeposito!: NgForm;
  public valor!: number;

  constructor(
    public dialogRef: MatDialogRef<ModalDepositoComponent>,
    private crudConta: CrudContaService,
    private loginService: LoginService,
    private autenticacaoService: CrudAutenticacaoService
  ) {}

  ngOnInit(): void {
    return;
  }

  closeModal() {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.formDeposito.invalid) {
      this.formDeposito.control.markAllAsTouched();
      return;
    }
    const autenticacaoId = this.loginService.getAutenticacaoId();
    const autenticacao = await this.autenticacaoService.getAutenticacao(
      autenticacaoId
    );
    const conta = await this.crudConta.getConta(autenticacao.conta!);
    await this.crudConta.deposito(conta.cliente!, this.valor);
    this.dialogRef.close();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudAutenticacaoService } from 'src/app/authentication/services/crud-autenticacao.service';
import { LoginService } from 'src/app/authentication/services/login.service';
import { CrudContaService } from 'src/app/conta/services/crud-conta.service';
import db from 'src/app/shared/database/database';

@Component({
  selector: 'app-modal-saque',
  templateUrl: './modal-saque.component.html',
  styleUrls: ['./modal-saque.component.scss'],
})
export class ModalSaqueComponent implements OnInit {
  @ViewChild('formSaque') formSaque!: NgForm;
  public valor!: number;
  public erroMsg = '';

  constructor(
    public dialogRef: MatDialogRef<ModalSaqueComponent>,
    private crudConta: CrudContaService,
    private loginService: LoginService,
    private autenticacaoService: CrudAutenticacaoService
  ) { }

  ngOnInit(): void {
    return;
  }

  actionFunction() {
    alert('You have logged out.');
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

  async onSubmit() {
    if (this.formSaque.invalid) {
      this.formSaque.control.markAllAsTouched();
      return;
    }
    try {
      await db.post('/account/withdraw/' + this.loginService.getCustumerId(), { amount: this.valor })
    } catch (err) {
      this.erroMsg = "Fundos insuficientes";
      return
    }
    this.dialogRef.close();
  }
}

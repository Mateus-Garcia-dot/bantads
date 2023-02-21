import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import axios, { AxiosError } from 'axios';
import { LoginService } from 'src/app/authentication/services/login.service';
import db from 'src/app/shared/database/database';

@Component({
  selector: 'app-modal-transferencia',
  templateUrl: './modal-transferencia.component.html',
  styleUrls: ['./modal-transferencia.component.scss'],
})
export class ModalTransferenciaComponent implements OnInit {
  @ViewChild('formSaque') formSaque!: NgForm;
  public cpf!: string;
  public valor!: number;
  public erroMsg = '';

  constructor(
    public dialogRef: MatDialogRef<ModalTransferenciaComponent>,
    private loginService: LoginService,
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
      await db.post('/account/transfer/' + this.loginService.getCustumerId(), { amount: this.valor, cpf: this.cpf });
    } catch (err) {
      if ((err as AxiosError).response?.status == 404) {
        this.erroMsg = "CPF não encontrado";
        return
      }
      this.erroMsg = "Saldo insuficiente";
      return
    }
    this.dialogRef.close();
  }
}

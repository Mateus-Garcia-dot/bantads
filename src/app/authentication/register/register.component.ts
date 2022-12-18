import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { RegisterService } from '../services/register.service';
import { CrudGerenteService } from 'src/app/gerente/services/crud-gerente.service';
import { Autenticacao } from 'src/app/shared/models/autenticacao.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formRegister') formRegister!: NgForm

  senha = ""
  cliente = new Cliente()
  endereco = new Endereco()
  autenticacao = new Autenticacao()

  constructor(
    private router: Router,
    private registerService: RegisterService,
    ) { }

  async ngOnInit() {
  }

  async onSubmit() {
    if (!this.formRegister.valid) {
      this.formRegister.control.markAllAsTouched()
      return
    }
    await this.registerService.register(this.cliente, this.endereco, this.autenticacao)
    this.router.navigate(['/']);
  }
}

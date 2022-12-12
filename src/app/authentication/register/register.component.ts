import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';
import { RegisterService } from '../services/register.service';

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

  constructor(private router: Router,
    private registerService: RegisterService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    if (!this.formRegister.valid) {
      this.formRegister.control.markAllAsTouched()
      return
    }
    this.registerService.register(this.cliente, this.endereco, this.senha)
    this.router.navigate(['/']);
  }
}

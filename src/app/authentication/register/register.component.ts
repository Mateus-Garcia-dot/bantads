import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { Endereco } from 'src/app/shared/models/endereco.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('formRegister') formRegister! : NgForm

  senha = ""
  cliente = new Cliente()
  endereco = new Endereco()

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.formRegister.valid) {
      this.formRegister.control.markAllAsTouched()
      return
    }
  }

}

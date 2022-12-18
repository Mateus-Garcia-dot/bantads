import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, pipe, switchMap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Cliente } from 'src/shared/models/cliente.model';
import { Login } from 'src/shared/models/login.model';
import { Usuario } from 'src/shared/models/usuario.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-autocadastro',
  templateUrl: './cliente-autocadastro.component.html',
  styleUrls: ['./cliente-autocadastro.component.css'],
})
export class ClienteAutocadastroComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;
  cliente!: Cliente;
  login!: Login;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService
  ) {
    this.redirecionaParaHome();
  }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  autocadastrar(): void {
    if (this.formCliente.form.valid) {
      this.usuarioService.registrar(new Usuario(1, this.cliente.nome, 'TESTE', 'TESTE', 'CLIENTE'))
      .pipe(
        switchMap(c => {
          this.login = c; 
          return this.clienteService.autocadastrar(this.cliente)
        } )
      )
      .subscribe(e => {
        console.log(e);
        if (e) {
          this.loginService.login(new Login(this.login.login, this.login.senha)).subscribe((uau) => {
              if (uau?.auth) {
                this.loginService.usuarioLogado = uau.data!;
                if (this.loginService.usuarioLogado.perfil === 'CLIENTE') {
                  this.router.navigate(['/home-cliente']);
                }
              } else {
              }
            });

          this.router.navigate(['home-cliente']);
        }
      });
    }
  }

  private redirecionaParaHome() {
    if (this.loginService.usuarioLogado) {
      this.router.navigate(['/home-cliente']);
    }
  }
}

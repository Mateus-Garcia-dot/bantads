import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, pipe, switchMap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { GerenteService } from 'src/app/gerente/services/gerente.service';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Cliente } from 'src/shared/models/cliente.model';
import { Login } from 'src/shared/models/login.model';
import { Usuario } from 'src/shared/models/usuario.model';
import { ClienteService } from '../services/cliente.service';
import { ContaService } from '../services/conta.service';

@Component({
  selector: 'app-cliente-autocadastro',
  templateUrl: './cliente-autocadastro.component.html',
  styleUrls: ['./cliente-autocadastro.component.css'],
})
export class ClienteAutocadastroComponent implements OnInit {
  @ViewChild('formCliente') formCliente!: NgForm;
  cliente!: Cliente;
  login!: Usuario;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private contaService: ContaService,
    private gerenteService: GerenteService,
  ) {
    this.redirecionaParaHome();
  }

  ngOnInit(): void {
    this.cliente = new Cliente();
  }

  autocadastrar(): void {
    if (this.formCliente.form.valid) {
      this.usuarioService.registrar(new Usuario(undefined, this.cliente.nome, this.cliente.nome, this.cliente.nome, 'CLIENTE'))
      .pipe(
        switchMap(login => {
          this.login = login;
          this.cliente.usuarioId = this.login.id;
          return this.clienteService.autocadastrar(this.cliente)
        } )
      )
      .pipe(
        switchMap(cliente => {
          this.cliente = cliente;
          return this.gerenteService.getGerenteDisponivel()
        } )
      )
      .pipe(
        switchMap(gerentes => {
          const gerenteDisponivel = gerentes[0];
          return this.contaService.criarConta(this.cliente, gerenteDisponivel)
        } )
      )
      .subscribe(conta => {
        if (conta) {
          this.loginService.login(new Login(this.login.login, this.login.senha)).subscribe((uau) => {
              if (uau.length) {
                this.loginService.usuarioLogado = uau[0];
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

  goToLogin(){
    this.router.navigate(['/login'])
  }

  private redirecionaParaHome() {
    if (this.loginService.usuarioLogado) {
      this.router.navigate(['/home-cliente']);
    }
  }
}

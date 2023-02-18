import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { Login } from 'src/shared/models/login.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.loginService?.usuarioLogado?.perfil === "CLIENTE") {
      this.router.navigate(['/home-cliente']);
    }
    if (this.loginService?.usuarioLogado?.perfil === "ADMIN") {
      this.router.navigate(['/home-admin']);
    }

    if (this.loginService?.usuarioLogado?.perfil === "GERENTE") {
      this.router.navigate(['/home-gerente']);
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => this.message = params["error"]);
  }

  goToCadastro() {
    this.router.navigate(['/autocadastro']);
  }

  logar(): void {
    this.loading = false;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).
        pipe(
          first(),
        ).subscribe((user) => {
          if (user) {
            user = user[0];
            this.loginService.usuarioLogado = user;
            this.loading = false;

            if (this.loginService.usuarioLogado.perfil === "CLIENTE") {
              this.router.navigate(['/home-cliente']);
            }
            if (this.loginService.usuarioLogado.perfil === "ADMIN") {
              this.router.navigate(['/home-admin']);
            }
            if (this.loginService.usuarioLogado.perfil === "GERENTE") {
              this.router.navigate(['/home-gerente']);
            }
          } else {
            this.loading = false;
            this.message = 'Usuário/Senha inválidos';
          }
        });
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/shared/models/usuario.model';
import { LoginService } from './auth/services/login.service';

const LS_CHAVE: string = 'usuarioLogado';
const LS_CHAVE_TOKEN: string = 'token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  get usuarioLogado(): Usuario | null {
    return this.loginService.usuarioLogado;
  }

  logout() {
    localStorage[LS_CHAVE] = null;
    localStorage[LS_CHAVE_TOKEN] = null;
    this.router.navigate(['/login']);
  }
}
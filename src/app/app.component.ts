import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './authentication/services/login.service';
import { Autenticacao } from './shared/models/autenticacao.model';
import { CrudAutenticacaoService } from './authentication/services/crud-autenticacao.service';
import { autenticacaoType } from './shared/models/autenticacao.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'bantads';
  isLoggedIn = false;
  authLevel: number | undefined = 0;
  autenticacaoType = autenticacaoType;

  constructor(public router: Router, private loginService: LoginService) {}

  async ngOnInit() {
    this.router.events.subscribe(async event => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoggedIn = await this.loginService.isLoggedIn();
        this.authLevel = await this.loginService.getPermissionLevel();
      }
    });
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}

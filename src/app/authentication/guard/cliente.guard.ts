import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { autenticacaoType } from 'src/app/shared/models/autenticacao.model';

@Injectable({
  providedIn: 'root',
})
export class ClienteGuard implements CanActivate {
  constructor(private route: Router, private loginService: LoginService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.loginService.isLoggedIn()) {
      this.route.navigate(['/']);
    }
    if (
      (await this.loginService.getPermissionLevel()) ===
      autenticacaoType.CLIENTE
    ) {
      return true;
    }
    return false;
  }
}

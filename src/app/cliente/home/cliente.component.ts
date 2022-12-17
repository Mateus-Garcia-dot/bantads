import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Cliente } from 'src/app/shared/models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {
  cliente!: Cliente | null

  constructor(private loginService: LoginService) { }

  async ngOnInit() {
    this.cliente = await this.loginService.getLoggedUser()
  }

}

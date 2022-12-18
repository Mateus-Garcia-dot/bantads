import { Component, OnInit } from '@angular/core';
import { Gerente } from 'src/shared/models/gerente.model';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  gerentes : Gerente[] = [];

  constructor(private  administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.gerentes = this.listarTodos();
  }

  listarTodos(): Gerente[] {
    return this.administradorService.listarTodos();
  }

  remover($event: any, gerente: Gerente): void{
    $event.preventDefault();
    if(confirm(`Deseja realmente remover o gerente ${gerente.login}?`) ){
      this.administradorService.remover(gerente.id!);
      this.gerentes = this.listarTodos();
    }
  
  }

}

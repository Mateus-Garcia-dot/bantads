import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Gerente } from 'src/shared/models/gerente.model';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  gerentes: Gerente[] = [];

  constructor(private administradorService: AdministradorService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.administradorService.listarTodos().subscribe(gerentes => this.gerentes = gerentes);
  }

  remover($event: any, gerente: Gerente): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o gerente ${gerente.login}?`)) {
      this.administradorService.remover(gerente.id!).subscribe(() => this.listarTodos());
    }

  }

}

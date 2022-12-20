import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GerenteService } from 'src/app/gerente/services/gerente.service';
import { Gerente } from 'src/shared/models/gerente.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  gerentes: Gerente[] = [];
  loading = true;

  constructor(private gerentesService: GerenteService) { }

  ngOnInit(): void {
    this.listarTodos();
  }

  listarTodos() {
    this.gerentesService.listarTodos().subscribe(gerentes => {
      this.gerentes = gerentes;
      this.loading = false;
    });
  }

  remover($event: any, gerente: Gerente): void {
    $event.preventDefault();
    if (confirm(`Deseja realmente remover o gerente ${gerente.login}?`)) {
      this.gerentesService.remover(gerente.id!).subscribe(() => {
        this.listarTodos()
      }
      );
    }

  }

}

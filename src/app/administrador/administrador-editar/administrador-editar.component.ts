import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Gerente } from 'src/shared/models/gerente.model';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-administrador-editar',
  templateUrl: './administrador-editar.component.html',
  styleUrls: ['./administrador-editar.component.css']
})
export class AdministradorEditarComponent implements OnInit {
  @ViewChild("formAdminGerente") formAdminGerente!: NgForm;
  gerente!: Gerente;

  constructor(
    private administradorService: AdministradorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.params['id'];
    this.administradorService.buscarPorId(id).subscribe(gerente => {
      if (gerente !== undefined) {
        this.gerente = gerente;
      } else {
        throw new Error("Gerente não encontrado id = " + id);
      }
    });
  }

  atualizar(): void {
    if (this.formAdminGerente.form.valid) {
      this.administradorService.atualizar(this.gerente).subscribe(() => {
        this.router.navigate(['/home-admin']);
      })
    }
  }

}

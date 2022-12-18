import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Gerente } from 'src/shared/models/gerente.model';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-administrador-inserir',
  templateUrl: './administrador-inserir.component.html',
  styleUrls: ['./administrador-inserir.component.css']
})
export class AdministradorInserirComponent implements OnInit {
  @ViewChild ('formAdminGerente') formAdminGerente!: NgForm;
  gerente!: Gerente;

  constructor(
    private administradorService: AdministradorService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.gerente =  new Gerente();
  }

  inserir() : void  {
    if(this.formAdminGerente.form.valid){
      this.administradorService.inserir(this.gerente).subscribe(() => this.router.navigate(["/home-admin"]));
    }
  }

}

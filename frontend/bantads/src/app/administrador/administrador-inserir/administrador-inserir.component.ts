import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Gerente } from 'src/shared/models/gerente.model';
import { Usuario } from 'src/shared/models/usuario.model';
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
    private userService: UsuarioService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.gerente =  new Gerente();
  }

  inserir() : void  {
    if(this.formAdminGerente.form.valid){
      this.administradorService.inserir(this.gerente).subscribe(() => {
        this.userService.registrar(new Usuario(undefined, this.gerente.login, this.gerente.login, this.gerente.senha, "GERENTE"))
        .subscribe(gerente => {
          this.router.navigate(["/home-admin"])
        })
      });
    }
  }

}

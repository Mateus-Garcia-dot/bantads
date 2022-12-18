import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdministradorService } from './services/administrador.service';
import { AdministradorEditarComponent } from './administrador-editar/administrador-editar.component';
import { AdministradorInserirComponent } from './administrador-inserir/administrador-inserir.component';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdministradorEditarComponent,
    AdministradorInserirComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    AdministradorService
  ]
})
export class AdministradorModule { }

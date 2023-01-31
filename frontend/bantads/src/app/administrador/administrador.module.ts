import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdministradorService } from './services/administrador.service';
import { AdministradorEditarComponent } from './administrador-editar/administrador-editar.component';
import { AdministradorInserirComponent } from './administrador-inserir/administrador-inserir.component';
import { NumericoDirectiveModule } from 'src/shared/directives/shared/directives/numerico-directive/numerico-directive.module';



@NgModule({
  declarations: [
    AdminHomeComponent,
    AdministradorEditarComponent,
    AdministradorInserirComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NumericoDirectiveModule
  ],
  providers: [
    AdministradorService
  ]
})
export class AdministradorModule { }

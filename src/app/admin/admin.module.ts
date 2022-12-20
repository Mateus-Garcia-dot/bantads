import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { NgxMaskModule } from 'ngx-mask';
import { InserirEditarGerenteComponent } from './inserir-editar-gerente/inserir-editar-gerente.component';
import { ListarGerentesComponent } from './listar-gerentes/listar-gerentes.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';

@NgModule({
  declarations: [AdminHomeComponent, InserirEditarGerenteComponent, ListarGerentesComponent, ListarClientesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class AdminModule {}

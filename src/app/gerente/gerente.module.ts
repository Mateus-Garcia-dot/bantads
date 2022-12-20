import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GerenteHomeComponent } from './gerente-home/gerente-home.component';
import { AutoCadastroComponent } from './auto-cadastro/auto-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { NgxMaskModule } from 'ngx-mask';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { MostrarUsuarioComponent } from './mostrar-usuario/mostrar-usuario.component';
import { ConsultarClienteComponent } from './consultar-cliente/consultar-cliente.component';
import { TopClientesComponent } from './top-clientes/top-clientes.component';

@NgModule({
  declarations: [GerenteHomeComponent, AutoCadastroComponent, ListarUsuariosComponent, MostrarUsuarioComponent, ConsultarClienteComponent, TopClientesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    NgxMaskModule.forRoot(),
  ],
})
export class GerenteModule {}

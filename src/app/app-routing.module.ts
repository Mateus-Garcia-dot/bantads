import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './administrador/admin-home/admin-home.component';
import { AdministradorEditarComponent } from './administrador/administrador-editar/administrador-editar.component';
import { AdministradorInserirComponent } from './administrador/administrador-inserir/administrador-inserir.component';
import { LoginRoutes } from './auth/auth-routing.module';
import { AuthGuard } from './auth/auth.guard';
import { ClienteAutocadastroComponent } from './cliente/cliente-autocadastro/cliente-autocadastro.component';
import { ClienteHomeComponent } from './cliente/cliente-home/cliente-home.component';
import { GerenteHomeComponent } from './gerente/gerente-home/gerente-home.component';
import {GerenteConsultaClientesComponent} from './gerente/gerente-consulta-clientes/gerente-consulta-clientes.component';
import { GerenteConsultaCpfComponent } from './gerente/gerente-consulta-cpf/gerente-consulta-cpf.component';
import { ClienteExtratoComponent } from './cliente/cliente-extrato/cliente-extrato.component';
import { GerenteClienteDetalhesComponent } from './gerente/gerente-cliente-detalhes/gerente-cliente-detalhes.component';
import { GerenteTopClientesComponent } from './gerente/gerente-top-clientes/gerente-top-clientes.component';

const routes: Routes = [
  { path: '', redirectTo: 'autocadastro', pathMatch: 'full' },
  ...LoginRoutes,
  { path: 'home-cliente', component: ClienteHomeComponent, canActivate: [AuthGuard], data: { role: 'CLIENTE' }},
  { path: 'autocadastro', component: ClienteAutocadastroComponent },
  { path: 'extrato', component: ClienteExtratoComponent },
  { path: 'home-admin', component: AdminHomeComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  { path: 'admin/gerente/editar/:id',  component: AdministradorEditarComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  { path: 'admin/gerente/inserir', component: AdministradorInserirComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' }},
  
  { path: 'home-gerente', component: GerenteHomeComponent, canActivate: [AuthGuard], data: { role: 'GERENTE' }},
  { path: 'clientes', component: GerenteConsultaClientesComponent, canActivate: [AuthGuard], data: { role: 'GERENTE' }},
  { path: 'clientes/detalhes/:id', component: GerenteClienteDetalhesComponent, canActivate: [AuthGuard], data: { role: 'GERENTE' }},
  { path: 'gerente-consulta-cpf', component: GerenteConsultaCpfComponent, canActivate: [AuthGuard], data: { role: 'GERENTE' }},
  { path: 'clientes/top', component: GerenteTopClientesComponent, canActivate: [AuthGuard], data: { role: 'GERENTE' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

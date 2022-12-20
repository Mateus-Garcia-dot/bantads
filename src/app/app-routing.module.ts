import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ClienteGuard } from './authentication/guard/cliente.guard';
import { GerenteGuard } from './authentication/guard/gerente.guard';
import { AutoCadastroComponent } from './gerente/auto-cadastro/auto-cadastro.component';
import { ClienteComponent } from './cliente/home/cliente.component';
import { GerenteHomeComponent } from './gerente/gerente-home/gerente-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminGuard } from './authentication/guard/admin.guard';
import { ListarGerentesComponent } from './admin/listar-gerentes/listar-gerentes.component';
import { InserirEditarGerenteComponent } from './admin/inserir-editar-gerente/inserir-editar-gerente.component';
import { ListarUsuariosComponent } from './gerente/listar-usuarios/listar-usuarios.component';
import { MostrarUsuarioComponent } from './gerente/mostrar-usuario/mostrar-usuario.component';
import { ConsultarClienteComponent } from './gerente/consultar-cliente/consultar-cliente.component';
import { TopClientesComponent } from './gerente/top-clientes/top-clientes.component';
import { ListarClientesComponent } from './admin/clientes/listar-clientes/listar-clientes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'cliente',
    children: [
      {
        path: 'home',
        component: ClienteComponent,
      },
      {
        path: 'editar/:id',
        component: EditarClienteComponent,
      },
    ],
    canActivate: [ClienteGuard],
  },
  {
    path: 'gerente',
    children: [
      {
        path: 'home',
        component: GerenteHomeComponent,
      },
      {
        path: 'auto-cadastro',
        component: AutoCadastroComponent,
      },
      {
        path: 'cliente/listar',
        component: ListarUsuariosComponent,
      },
      {
        path: 'cliente/mostrar/:id',
        component: MostrarUsuarioComponent,
      },
      {
        path: 'cliente/consultar',
        component: ConsultarClienteComponent,
      },
      {
        path: 'cliente/top-clientes',
        component: TopClientesComponent,
      },
    ],
    canActivate: [GerenteGuard],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: AdminHomeComponent,
      },
      {
        path: 'gerente',
        children: [
          {
            path: 'listar',
            component: ListarGerentesComponent,
          },
          {
            path: 'editar/:id',
            component: InserirEditarGerenteComponent,
          },
          {
            path: 'inserir',
            component: InserirEditarGerenteComponent,
          },
        ],
      },
      {
        path: 'cliente',
        children: [
          {
            path: 'listar',
            component: ListarClientesComponent,
          },
        ],
      },
    ],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

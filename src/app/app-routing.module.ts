import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ClienteGuard } from './authentication/guard/cliente.guard';
import { GerenteGuard } from './authentication/guard/gerente.guard';
import { AutoCadastroComponent } from './gerente/auto-cadastro/auto-cadastro.component';
import { ClienteComponent } from './cliente/home/cliente.component';
import { GerenteHomeComponent } from './gerente/gerente-home/gerente-home.component';

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
        canActivate: [ClienteGuard],
      },
      {
        path: 'editar/:id',
        component: EditarClienteComponent,
        canActivate: [ClienteGuard],
      },
    ],
  },
  {
    path: 'gerente',
    children: [
      {
        path: 'home',
        component: GerenteHomeComponent,
        canActivate: [GerenteGuard],
      },
      {
        path: 'auto-cadastro',
        component: AutoCadastroComponent,
        canActivate: [GerenteGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

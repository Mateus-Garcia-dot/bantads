import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ClienteComponent } from './cliente/home/cliente.component';
import { ClienteGuard } from './authentication/guard/cliente.guard';
import { GerenteGuard } from './authentication/guard/gerente.guard';
import { GerenteHomeComponent } from './gerente/gerente-home/gerente-home.component';
import { AutoCadastroComponent } from './gerente/auto-cadastro/auto-cadastro.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'home',
  component: ClienteComponent,
  canActivate: [ClienteGuard]
}, {
  path: 'gerenteHome',
  component: GerenteHomeComponent,
  canActivate: [GerenteGuard]
},
{
  path: 'editarCliente/:id',
  component: EditarClienteComponent,
  canActivate: [ClienteGuard]
},{
  path: 'gerenteAutoCadastro',
  component: AutoCadastroComponent,
  canActivate: [GerenteGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

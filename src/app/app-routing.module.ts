import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './authentication/guard/auth-guard.guard';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ClienteComponent } from './cliente/home/cliente.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'home',
  component: ClienteComponent,
  canActivate: [AuthGuardGuard]
},
{
  path: 'editarCliente/:id',
  component: EditarClienteComponent,
  canActivate: [AuthGuardGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

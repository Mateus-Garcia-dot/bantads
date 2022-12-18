import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenteHomeComponent } from './gerente-home/gerente-home.component';
import { GerenteConsultaClientesComponent } from './gerente-consulta-clientes/gerente-consulta-clientes.component';
import { GerenteConsultaCpfComponent } from './gerente-consulta-cpf/gerente-consulta-cpf.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GerenteService } from './services/gerente.service';
import { ModalGerenteComponent } from './modal-gerente/modal-gerente.component';
import { GerenteClienteDetalhesComponent } from './gerente-cliente-detalhes/gerente-cliente-detalhes.component';
import { GerenteTopClientesComponent } from './gerente-top-clientes/gerente-top-clientes.component';


@NgModule({
  declarations: [
    GerenteHomeComponent,
    GerenteConsultaClientesComponent,
    GerenteConsultaCpfComponent,
    ModalGerenteComponent,
    GerenteClienteDetalhesComponent,
    GerenteTopClientesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    GerenteService
  ]
})
export class GerenteModule { }

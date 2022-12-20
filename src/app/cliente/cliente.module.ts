import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { ClienteAutocadastroComponent } from './cliente-autocadastro/cliente-autocadastro.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClienteExtratoComponent } from './cliente-extrato/cliente-extrato.component';
import { NumericoDirectiveModule } from 'src/shared/directives/shared/directives/numerico-directive/numerico-directive.module';



@NgModule({
  declarations: [
    ClienteHomeComponent,
    ClienteAutocadastroComponent,
    ClienteExtratoComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NumericoDirectiveModule
  ]
})
export class ClienteModule { }

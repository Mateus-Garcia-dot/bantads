import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClienteComponent } from './home/cliente.component';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    EditarClienteComponent,
    ClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
  ],
  exports: [
  ]
})
export class ClienteModule { }

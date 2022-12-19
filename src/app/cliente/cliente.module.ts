import { NgModule } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClienteComponent } from './home/cliente.component';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { NgxMaskModule } from 'ngx-mask';
import { ModalDepositoComponent } from './modal-deposito/modal-deposito.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalSaqueComponent } from './modal-saque/modal-saque.component';
import { ModalTransferenciaComponent } from './modal-transferencia/modal-transferencia.component';

@NgModule({
  declarations: [
    EditarClienteComponent,
    ClienteComponent,
    ModalDepositoComponent,
    ModalSaqueComponent,
    ModalTransferenciaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  exports: [],
})
export class ClienteModule {}

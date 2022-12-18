import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule } from '@angular/router';
import { GerenteHomeComponent } from './gerente-home/gerente-home.component';
import { AutoCadastroComponent } from './auto-cadastro/auto-cadastro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NarikCustomValidatorsModule } from '@narik/custom-validators';
import { NgxMaskModule } from 'ngx-mask';



@NgModule({
  declarations: [
    GerenteHomeComponent,
    AutoCadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NarikCustomValidatorsModule,
    NgxMaskModule.forRoot()
  ]
})
export class GerenteModule { }

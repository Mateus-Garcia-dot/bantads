import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfDirective } from './cpf.directive';



@NgModule({
  declarations: [
    CpfDirective
  ],
  exports: [CpfDirective],
  imports: [
    CommonModule
  ]
})
export class CpfDirectiveModule { }

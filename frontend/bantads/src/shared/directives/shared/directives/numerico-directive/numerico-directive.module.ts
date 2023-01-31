import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumericoDirective } from './numerico.directive';



@NgModule({
  declarations: [NumericoDirective],
  exports: [NumericoDirective],
  imports: [
    CommonModule
  ]
})
export class NumericoDirectiveModule { }

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[cpfValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfDirective,
    multi: true
  }]
})
export class CpfDirective implements Validator {

  cpfLength = 11;

  constructor() { }

  buildDigit(arr: number[]): number {

    const isCpf = arr.length < this.cpfLength;
    const digit = arr
      .map((val, idx) => val * ((!isCpf ? idx % 8 : idx) + 2))
      .reduce((total, current) => total + current) % this.cpfLength;

    if (digit < 2 && isCpf) {
      return 0;
    }

    return this.cpfLength - digit;
  }

  validate(c: AbstractControl): ValidationErrors | null {

    const cpf = c.value.replace(/\D/g, '');

    if ([this.cpfLength].indexOf(cpf.length) < 0) {
      return { cpfInvalido: true };
    }

    if (/^([0-9])\1*$/.test(cpf)) {
      return { cpfInvalido: true };
    }

    const cpfArr: number[] = cpf.split('').reverse().slice(2);

    cpfArr.unshift(this.buildDigit(cpfArr));
    cpfArr.unshift(this.buildDigit(cpfArr));

    if (cpf !== cpfArr.reverse().join('')) {
      return { cpfInvalido: true };
    }

    return null;
  }
}
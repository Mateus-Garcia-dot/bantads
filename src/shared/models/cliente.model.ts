import { Conta } from './conta.model';
import { Endereco } from './endereco.model';
import { Usuario } from './usuario.model';

export class Cliente {
  constructor(
    public id?: number,
    public salario?: number,
    public conta?: Conta,
    public nome?: string,
    public email?: string,
    public cpf?: string,
    public endereco?: Endereco,
    public usuario?: Usuario
  ) {
    this.endereco = new Endereco();
    this.conta = new Conta();
  }
}

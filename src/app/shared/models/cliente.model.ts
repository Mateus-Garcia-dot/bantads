export class Cliente {
  constructor(
    public uuid?: string,
    public name?: string,
    public cpf?: string,
    public address?: number,
    public phone?: string,
    public salary?: number
  ) { }

  public toJson() {
    return {
      name: this.name,
      cpf: this.cpf,
      address: this.address,
      phone: this.phone,
      salary: this.salary,
    };
  }
}

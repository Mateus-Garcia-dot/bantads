export class Endereco {
  constructor(
    public id?: string,
    public type?: string,
    public street?: string,
    public number?: number,
    public city?: string,
    public complement?: string,
    public cep?: string,
    public state?: string
  ) { }

  public toJson() {
    return {
      type: this.type,
      street: this.street,
      number: this.number,
      city: this.city,
      complement: this.complement,
      cep: this.cep,
      state: this.state,
    };
  }
}

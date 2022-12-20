export class Gerente {
    constructor(
        public id?: number,
        public login?: number,
        public senha?: string,
        public saldoPositivo?: string,
        public saldoNegativo?: string,
        public quantidadeClientes: number = 0
    ){}
}

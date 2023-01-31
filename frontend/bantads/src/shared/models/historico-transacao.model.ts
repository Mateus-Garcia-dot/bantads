import { TipoTransacao } from "../enums/tipo-transacao";
import { Cliente } from "./cliente.model";
import { Conta } from "./conta.model";

export class HistoricoTransacao {


    constructor(
        public tipoTransacao?: TipoTransacao,
        public valor?: number,
        public contaOrigem?: Conta,
        public contaDestino?: Conta,
        public data?: Date,

        ) {
        this.data = new Date();
    }

}

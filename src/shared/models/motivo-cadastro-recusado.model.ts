import { Data } from "@angular/router";
import { Conta } from "./conta.model";

export class MotivoCadastroRecusado {
    constructor(
        public id?: number,
        public motivo?: string,
        public conta?: Conta,
        public data?: Date
    ){}
}

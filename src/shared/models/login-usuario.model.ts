import { Usuario } from "./usuario.model";

export class LoginUsuario {

    constructor(
        public auth?: boolean,
        public data?: Usuario,
        public token?: string,
    ) { }
}

export default class AdressUser {
    constructor(
        public cep: string,
        public casa: string,
        public bairro: string,
        public endereco: string,
        public cidade: string,
        public estado: string
    ) {}

    static createAdress(
        cep: string,
        casa: string,
        bairro: string,
        endereco: string,
        cidade: string,
        estado: string
    ) {
        if (cep.length > 9) {
            throw new Error("CEP não pode ter mais de 9 dígitos.");
        }

        if (!/^\d+$/.test(casa.trim())) {
            throw new Error("Casa deve conter apenas números.");
        }

        if (/^\d+$/.test(endereco.trim())) {
            throw new Error("Endereço não pode conter apenas números.");
        }

        return new AdressUser(cep, casa, bairro, endereco, cidade, estado);
    }
}

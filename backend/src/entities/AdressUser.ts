export default class AdressUser{

    constructor(public cep: string, public casa: string, public bairro: string, public endereco: string, public cidade: string, public estado: string){
    }

    static createAdress(cep: string, casa: string, bairro: string, endereco: string, cidade: string, estado: string){
        if(cep.length > 9){
            throw new Error("Cep não pode ter mais de 9 digitos");
        }
        // ve se a casa possui apenas numeros
        if(!(/^\d+$/.test(casa.trim()))){
            throw new Error("Casa não pode ter letras.")
        }

        if((/^\d+$/.test(endereco.trim()))){
            throw new Error("Endereço não pode ser apenas numeros.")
        }

        return new AdressUser(cep, casa, bairro, endereco, cidade, estado);
    }
}
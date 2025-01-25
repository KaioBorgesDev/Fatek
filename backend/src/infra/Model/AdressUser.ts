import { Schema, model } from "mongoose";

const AdressUserSchema = new Schema({
    id_user: { type: String, unique: true, required: true },
    cep: { type: String, required: true },
    casa: {type: String, required: true},
    bairro: {type: String, required: true},
    endereco: {type: String, required: true},
    cidade: {type: String, required: true},
    estado: {type: String, required: true}
});

const AdressUser = model("AdressUser", AdressUserSchema);

export default AdressUser;

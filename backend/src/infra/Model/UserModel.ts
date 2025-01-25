import { Schema, model } from "mongoose";
import crypto from "node:crypto";

const UserSchema = new Schema({
    id_user: { type: String, default: crypto.randomUUID, unique: true },
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
    rule: {
        type: String,
        enum: ["User", "Admin"],
        default: "User",
    },
    status: {
        type: String,
        enum: ["Ativo", "Inativo"],
        default: "Ativo",
    },
    address: {
        street: { type: String, default: null },
        city: { type: String, default: null },
        state: { type: String, default: null },
        postalCode: { type: String, default: null },
        number: { type: String, default: null },
        neighborhood: { type: String, default: null },
    }, 
});


const UserModel = model("user", UserSchema);

export default UserModel;

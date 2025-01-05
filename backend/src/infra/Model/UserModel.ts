import { Schema, model } from "mongoose";
import crypto from "node:crypto";

const UserSchema = new Schema({
    id_user: { type: String, default: crypto.randomUUID, unique: true },
    email: { type: String, unique: true , required: true},
    password: { type: String, required: true},
    status: {
        type: String,
        enum: ["Ativo", "Inativo"],
        default: "Ativo",
    },
});

const UserModel = model("user", UserSchema);

export default UserModel;
import UserRepository from "src/adapters/repository/UserRepository";
import User from "src/entities/User";
import UserModel from "../Model/UserModel";
import AdressUser from "src/entities/AdressUser";


export default class UserRepositoryImp implements UserRepository{
    async findById(userId: string): Promise<User | null> {
        return await UserModel.findOne({ id_user: userId });
    }
    async saveAdress(userId: string, address: AdressUser): Promise<void> {
        await UserModel.updateOne({id_user: userId}, { address: { number: address.casa, street: address.endereco, city: address.cidade, state: address.estado, postalCode: address.cep, neighborhood: address.bairro} });
    }
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email: email})
    }
    async save(email: string, password: string): Promise<void> {
        const user = User.create(email, password);
        await UserModel.create(user);
    }

}
import UserRepository from "src/adapters/repository/UserRepository";
import User from "src/entities/User";
import UserModel from "../Model/UserModel";


export default class UserRepositoryImp implements UserRepository{
    async findByEmail(email: string): Promise<User | null> {
        return await UserModel.findOne({email: email})
    }
    async save(email: string, password: string): Promise<void> {
        const user = User.create(email, password);
        await UserModel.create(user);
    }

}
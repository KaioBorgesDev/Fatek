import UserRepository from "src/adapters/repository/UserRepository";
import User from "src/entities/User";

export default class UserRepositoryImp implements UserRepository{
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async save(email: string, password: string): Promise<void> {
        
    }

}
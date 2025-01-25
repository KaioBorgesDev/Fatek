import AdressUser from "src/entities/AdressUser";
import User from "src/entities/User";

export default interface UserRepository{
    save(email: string, password: string): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<any>;
    saveAdress(userId: string, address: AdressUser): Promise<void>;
}
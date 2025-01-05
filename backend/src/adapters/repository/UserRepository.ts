import User from "src/entities/User";

export default interface UserRepository{
    save(email: string, password: string): Promise<void>;
    findByEmail(email: string): Promise<User>;
}
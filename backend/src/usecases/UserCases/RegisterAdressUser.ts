import UserRepository from "src/adapters/repository/UserRepository";
import AdressUser from "src/entities/AdressUser";

export default class RegisterAdressUser {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userId: string, address: AdressUser): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("Usuário não encontrado.");
        }
        await this.userRepository.saveAdress(userId, address);
    }
}

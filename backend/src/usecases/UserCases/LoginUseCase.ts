import UserRepository from "../../adapters/repository/UserRepository";
import { ITokenService } from "../../adapters/services/ITokenService";
import User from "../../entities/User";

class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private tokenService: ITokenService
    ) {}

    async execute(email: string, password: string): Promise<string> {
        const userData: User = await this.userRepository.findByEmail(email);

        if (!userData) throw new Error("Credentials Invalid!");

        const user = new User(userData.email, userData.passwordHash);

        if (await user.validatePassword(password) === false)
            throw new Error("Credentials Invalid!");

        return await this.tokenService.generateToken({
            id_user: userData.id_user,
        });
    }
}

export default LoginUseCase;

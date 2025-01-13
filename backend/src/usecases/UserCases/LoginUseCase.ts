import UserRepository from "src/adapters/repository/UserRepository";
import { ITokenService } from "src/adapters/services/ITokenService";
import User from "src/entities/User";

class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private tokenService: ITokenService
    ) {}

    async execute(email: string, password: string): Promise<string> {
        const userData = await this.userRepository.findByEmail(email);

        if (!userData) throw new Error("Credentials Invalid!");

        const user = new User(userData.email, userData.password);

        if (!user.validatePassword(password))
            throw new Error("Credentials Invalid!");

        return await this.tokenService.generateToken({ email: email });
    }
}

export default LoginUseCase;

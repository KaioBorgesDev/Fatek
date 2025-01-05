import UserRepository from "src/adapters/repository/UserRepository";
import { ITokenService } from "src/adapters/services/ITokenService";

class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private tokenService: ITokenService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.validatePassword(password)) {
      throw new Error("Invalid credentials");
    }

    const token = this.tokenService.generateToken({
      email: user.email,
    });

    return token;
  }
}

export default LoginUseCase;

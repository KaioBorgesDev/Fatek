import UserRepository from "src/adapters/repository/UserRepository";

class RegisterUseCase{
    constructor(readonly userRepository: UserRepository){
    }

    async execute(email: string, password: string) : Promise<void>{
        return await this.userRepository.save(email,password);
    }
}
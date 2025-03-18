import UserRepository from "src/adapters/repository/UserRepository";

export default class RegisterUseCase{
    constructor(readonly userRepository: UserRepository){
    }

    async execute(email: string, password: string, name: string) : Promise<void>{
        return await this.userRepository.save(email, password, name);
    }
}

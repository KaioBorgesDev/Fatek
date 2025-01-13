import { ITokenService } from "src/adapters/services/ITokenService";


export default class ValidateTokenCase {

    constructor(readonly jwtTokenService: ITokenService){
    }

    async execute(token: string): Promise<object | null>{
        return await this.jwtTokenService.verifyToken(token);
    }
}
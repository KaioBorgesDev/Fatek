import { ITokenService } from "src/adapters/services/ITokenService";
import { TypeUserAuth } from "src/infra/Service/JwtTokenService";


export default class ValidateTokenCase {

    constructor(readonly jwtTokenService: ITokenService){
    }

    async execute(token: string): Promise<TypeUserAuth>{
        return await this.jwtTokenService.verifyToken(token);
    }
}

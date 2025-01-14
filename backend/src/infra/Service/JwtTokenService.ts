import jwt from "jsonwebtoken";
import { ITokenService } from "src/adapters/services/ITokenService";

export class JwtTokenService implements ITokenService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async generateToken(payload: object): Promise<string> {
    return await jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  async verifyToken(token: string): Promise<TypeUserAuth> {
   
    return await jwt.verify(token, this.secretKey);
  } 
}

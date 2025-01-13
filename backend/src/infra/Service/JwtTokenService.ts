import jwt from "jsonwebtoken";
import { ITokenService } from "src/adapters/services/ITokenService";

export class JwtTokenService implements ITokenService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: '1h' });
  }

  verifyToken(token: string): object | null {
    return jwt.verify(token, this.secretKey);
  } 
}

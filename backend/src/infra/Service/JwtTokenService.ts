import jwt from "jsonwebtoken";
import { ITokenService } from "src/adapters/services/ITokenService";


export interface TypeUserAuth {
  id_user: string;
  email: string;
}

export class JwtTokenService implements ITokenService {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async generateToken(payload: TypeUserAuth): Promise<string> {
    return jwt.sign(payload, this.secretKey, { expiresIn: "1h" });
  }


  async verifyToken(token: string): Promise<TypeUserAuth> {
    try {
      const decoded = await jwt.verify(token, this.secretKey) as TypeUserAuth;
      return decoded;
    } catch (error) {
      throw new Error("Token inválido ou expirado.");
    }
  }
}

export interface ITokenService {
    generateToken(payload: object): Promise<string>;
    verifyToken(token: string): Promise<object | null>;
}
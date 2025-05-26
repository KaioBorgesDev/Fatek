import { describe, test, expect } from '@jest/globals';
import { JwtTokenService, TypeUserAuth } from '../src/infra/Service/JwtTokenService'; // ajuste o caminho conforme necessário

const SECRET_KEY = 'minha-chave-secreta';

describe('JwtTokenService', () => {
  const jwtService = new JwtTokenService(SECRET_KEY);
  const payload: TypeUserAuth = {
    id_user: 'user123',
    email: 'user@example.com'
  };

  test('14 | generateToken() - Criar um Token', async () => {
    const token = await jwtService.generateToken(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3); // formato JWT: header.payload.signature
  });

  test('15 | verifyToken() - Verificar se Token é válido', async () => {
        const token = await jwtService.generateToken(payload);
        const decoded = await jwtService.verifyToken(token);
        expect(decoded.id_user).toBe(payload.id_user);
        expect(decoded.email).toBe(payload.email);
    });

  test('16 | verifyToken() - Verificar se Token é inválido', async () => {
    const invalidToken = '1239I12301';
    await expect(jwtService.verifyToken(invalidToken)).rejects.toThrow('Token inválido ou expirado.');
  });
});

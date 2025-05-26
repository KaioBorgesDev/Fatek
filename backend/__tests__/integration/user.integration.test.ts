import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import app from '../../src/index'; // ajuste o caminho para seu app Express

interface UserPayload {
  email: string;
  password: string;
  name: string;
}

describe('Cadastro de Usuário - Integração', () => {
  test('Deve criar usuário com dados válidos', async () => {
    const payload: UserPayload = {
      email: 'teste@exemplo.com',
      password: 'senhaSegura123',
      name: 'Usuário Teste',
    };

    // Faz requisição POST para a rota de criação de usuário
    const res = await request(app).post('/register').send(payload);

    // Valida o status HTTP 201 (Created)
    expect(res.status).toBe(201);

    // Valida se o body tem a propriedade id_user
    expect(res.body).toHaveProperty('id_user');

    // Confirma que o email retornado é o que foi enviado
    expect(res.body.email).toBe(payload.email);

    // Aqui pode ter outras validações conforme seu contrato da API
  });

  test('Deve falhar para email inválido', async () => {
    const payload: UserPayload = {
      email: 'emailinvalido',
      password: 'senhaSegura123',
      name: 'Usuário Teste',
    };

    const res = await request(app).post('/users').send(payload);

    // Espera um status 400 (Bad Request)
    expect(res.status).toBe(400);

    // Espera que o body tenha propriedade error
    expect(res.body).toHaveProperty('error');

    // Verifica se a mensagem de erro menciona email (case insensitive)
    expect(res.body.error).toMatch(/email/i);
  });

});

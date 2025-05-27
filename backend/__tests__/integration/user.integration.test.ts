import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import app from '../../src/app'; // ajuste o caminho para seu app Express

describe('Cadastro de Usuário - Integração', () => {
  test('Deve cadastrar um usuário com dados válidos', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        email: `teste${Date.now()}@exemplo.com`, // email único para evitar duplicatas
        password: '123456',
        name: 'Usuário de Teste'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Usuário registrado com sucesso');
  });
});


describe('Cadastro de Usuário - Dados inválidos', () => {
  test('Deve retornar 400 se email, senha ou nome estiverem ausentes', async () => {
    const res = await request(app).post('/register').send({
      email: '',
      password: '',
      name: ''
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/Erro ao registrar usuário/i);
  });
});

test('Deve retornar 409 se senha for menor que 6 caracteres', async () => {
  const res = await request(app).post('/register').send({
    email: 'teste@invalido.com',
    password: '123',
    name: 'Nome Teste'
  });

  expect(res.status).toBe(400);
  expect(res.body.message.error).toBe('Erro ao registrar usuário: Password must be at least 6 characters long');
});

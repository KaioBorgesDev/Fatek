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
  test('Deve retornar 400 se email ou nome estiverem ausentes', async () => {
    const res = await request(app).post('/register').send({
      email: '',
      password: '123456',
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
  expect(res.body.message).toBe('Senha está muito curta. Deve ter pelo menos 6 caracteres.');
});



describe('Login de Usuário - Integração', () => {
  test('Deve fazer login com email e senha válidos e retornar token', async () => {
    // Primeiro, registramos um novo usuário
    const email = `teste${Date.now()}@exemplo.com`;
    const password = '123456';

    const resRegister = await request(app).post('/register').send({
      email,
      password,
      name: 'Usuário Teste'
    });

    expect(resRegister.status).toBe(201);

    // Em seguida, fazemos o login com o mesmo email e senha
    const resLogin = await request(app).post('/login').send({
      email,
      passwordHash: password
    });

    expect(resLogin.status).toBe(200);
    expect(resLogin.body).toHaveProperty('token');
    expect(typeof resLogin.body.token).toBe('string');
  });


describe('Login de Usuário - Falha', () => {
  test('Deve retornar erro 401 ao tentar login com email ou senha inválidos', async () => {
    const resLogin = await request(app).post('/login').send({
      email: 'usuarioinexistente@example.com',
      passwordHash: 'senhaerrada'
    });

    expect(resLogin.status).toBe(401);
    expect(resLogin.body).toHaveProperty('error');
    expect(resLogin.body.error).toBe('E-mail ou senha inválidos');
  });
});
});

describe('Cadastro de Endereço de Venda - Integração', () => {
  test('Deve cadastrar um endereço com dados válidos e retornar mensagem de sucesso', async () => {
    // Primeiro, registra um novo usuário para obter um ID válido
    const email = `teste${Date.now()}@exemplo.com`;
    const password = '123456';

    const resUser = await request(app).post('/register').send({
      email,
      password,
      name: 'Usuário de Teste'
    });

    expect(resUser.status).toBe(201);

    // Agora faz login para pegar o token (caso necessário no middleware)
    const resLogin = await request(app).post('/login').send({
      email,
      passwordHash: password
    });

    expect(resLogin.status).toBe(200);
    const token = resLogin.body.token;

    // Envia o endereço para o endpoint de registro de endereço
    const resAddress = await request(app)
      .post('/address') // ajuste para a rota correta
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_user: resLogin.body.id || resUser.body.id || 1, // substitua pela extração correta
        cep: '12345-678',
        casa: '123',
        bairro: 'Centro',
        endereco: 'Rua Exemplo',
        cidade: 'Cidade Teste',
        estado: 'SP'
      });

    expect(resAddress.status).toBe(200);
    expect(resAddress.body).toHaveProperty('message', 'Endereço registrado com sucesso!');
  });
});

import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import app from '../../src/app'; 
import path from 'path';


describe('Cadastro de Livro - Integração', () => {
  test('Deve cadastrar um livro com dados válidos e imagem', async () => {

    // Cria e autentica um usuário para obter token JWT
    const email = `livro${Date.now()}@teste.com`;
    const password = '123456';

    const resRegister = await request(app).post('/register').send({
      email,
      password,
      name: 'Usuário Livro'
    });

    expect(resRegister.status).toBe(201);

    const resLogin = await request(app).post('/login').send({
      email,
      passwordHash: password
    });

    expect(resLogin.status).toBe(200);
    const token = resLogin.body.token;

    const imagePath = path.resolve(__dirname, '../mocks/livro.jpg');

    const resBook = await request(app)
      .post('/book')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Livro de Teste')
      .field('autor', 'Autor Teste')
      .field('description', 'Descrição do livro de teste')
      .field('price', 49.9)
      .field('category', 'Ficção')
      .field('publisher', 'Editora Teste')
      .field('release_date', '2024-01-01')
      .attach('file', imagePath);


    expect(resBook.status).toBe(201);
    expect(resBook.body).toHaveProperty('message', 'Book created successfully!');
  });
});

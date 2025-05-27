import request from 'supertest';
import { describe, test, expect, beforeAll } from '@jest/globals';
import app from '../../src/app';
import path from 'path';
import { Console } from 'console';

describe('Adicionar ao Carrinho - Integração', () => {
  let token: string;
  let userId: number;
  let bookId: number;

  beforeAll(async () => {
    // 1) Criar usuário para teste
    const email = `user${Date.now()}@teste.com`;
    const password = '123456';

    const resRegister = await request(app).post('/register').send({
      email,
      password,
      name: 'Usuário Teste'
    });

    expect(resRegister.status).toBe(201);

    userId = resRegister.body.id_user;

    // 2) Logar para obter token JWT
    const resLogin = await request(app).post('/login').send({
      email,
      passwordHash: password,
    });

    expect(resLogin.status).toBe(200);

    token = resLogin.body.token;

    const imagePath = path.resolve(__dirname, '../mocks/livro.jpg');

    const resBook = await request(app)
        .post('/book')
        .set('Authorization', `Bearer ${token}`)
        .field('title', 'Livro Teste')
        .field('autor', 'Autor Teste')
        .field('description', 'Livro para teste de carrinho')
        .field('price', 50)
        .field('category', 'Teste')
        .field('publisher', 'Editora Teste')
        .field('release_date', '2024-01-01')
        .attach('file', imagePath);

    expect(resBook.status).toBe(201);

    bookId = resBook.body.book.id_book;

    });


  test('Deve adicionar item ao carrinho e exibir mensagem de confirmação', async () => {
    const res = await request(app)
      .post('/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bookId,
        quantity: 1,
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Item adicionado ao carrinho com sucesso!');
    expect(res.body).toHaveProperty('cartItem');

    expect(res.body.cartItem).toMatchObject({
        bookId: String(bookId),
        quantity: 1
    });
  });


  test('Deve retornar erro 400 para dados inválidos', async () => {
    const res = await request(app)
      .post('/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_user: userId,
        bookId: null,
        quantity: 1
      });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Dados inválidos.');
  });
});

import request from 'supertest';
import { describe, test, expect } from '@jest/globals';
import app from '../../src/app';

describe('Rota /teste - Integração', () => {
  test('Deve responder com status 200 e corpo "certo"', async () => {
    const response = await request(app).get('/teste');

    expect(response.status).toBe(200);
    expect(response.text).toBe('certo');
  });
});

import { describe, expect, test } from '@jest/globals';
import Order from '../src/entities/Order'; // ajuste o caminho conforme a sua estrutura

describe('Order Entity', () => {
  test('deve criar um pedido com dados válidos', () => {
    const date = new Date('2024-01-01');
    const order = new Order(1, 'user123', date, 'aprovado');

    expect(order.id_order).toBe(1);
    expect(order.id_buyer).toBe('user123');
    expect(order.order_date).toEqual(date);
    expect(order.status).toBe('aprovado');
  });

  test('deve usar o status padrão "pendente" se não for fornecido', () => {
    const order = new Order(2, 'user456');

    expect(order.status).toBe('pendente');
  });

  test('deve usar a data atual se order_date não for fornecida', () => {
    const before = new Date();
    const order = new Order(3, 'user789');
    const after = new Date();

    expect(order.order_date).toBeInstanceOf(Date);
    expect(order.order_date!.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(order.order_date!.getTime()).toBeLessThanOrEqual(after.getTime());
  });

  test('deve lançar erro se o status for inválido', () => {
    expect(() => {
      new Order(4, 'user000', undefined, 'entregue');
    }).toThrow('status deve ser um dos seguintes valores: pendente, aprovado, cancelado.');
  });

  test('deve aceitar status "cancelado"', () => {
    const order = new Order(5, 'user321', new Date(), 'cancelado');
    expect(order.status).toBe('cancelado');
  });
});

// src/infra/Service/CartRepositoryImp.ts
import { CartRepository } from "src/adapters/repository/CartRepository";
import pool from "../Database/mysql";
import { CartItemResponse } from "src/types/cartTypes";

export class MySQLCartRepository implements CartRepository {
  async getAllItems(userId: string): Promise<CartItemResponse[]> {
    // 1. Encontra o carrinho do usuário
    const [carts]: any = await pool.execute(
      "SELECT id_cart FROM shopping_cart WHERE id_user = ?",
      [userId]
    );

    if (carts.length === 0) {
      return []; // Retorna array vazio se não houver carrinho
    }

    const id_cart = carts[0].id_cart;

    // 2. Busca todos os itens do carrinho com informações do livro
    const [items]: any = await pool.execute(
      `SELECT
        ci.id_cart_item,
        ci.id_book,
        ci.quantity,
        ci.added_at,
        b.title,
        b.price,
        b.image_url
       FROM cart_items ci
       JOIN books b ON ci.id_book = b.id
       WHERE ci.id_cart = ?`,
      [id_cart]
    );

    // 3. Mapeia para o tipo de retorno esperado
    return items.map((item: any) => ({
      id: item.id_cart_item.toString(),
      bookId: item.id_book.toString(),
      quantity: item.quantity,
      addedAt: item.added_at,
      bookDetails: {  // Adicionando informações extras do livro
        title: item.title,
        price: item.price,
        image: item.image_url
      }
    }));
    }
  async addItem(userId: string, bookId: string, quantity: number) {
    // 1. Encontra ou cria o carrinho do usuário
    const [cart]: any = await pool.execute(
      "SELECT id_cart FROM shopping_cart WHERE id_user = ? LIMIT 1",
      [userId]
    );

    let id_cart: number;

    if (cart.length === 0) {
      const [newCart]: any = await pool.execute(
        "INSERT INTO shopping_cart (id_user) VALUES (?)",
        [userId]
      );
      id_cart = newCart.insertId;
    } else {
      id_cart = cart[0].id_cart;
    }

    // 2. Verifica se o item já existe no carrinho
    const [existingItem]: any = await pool.execute(
      `SELECT id_cart_item FROM cart_items
       WHERE id_cart = ? AND id_book = ?`,
      [id_cart, bookId]
    );

    if (existingItem.length > 0) {
      throw new Error("Item já está no carrinho.");
    }

    // 3. Adiciona o novo item
    const [result]: any = await pool.execute(
      `INSERT INTO cart_items (id_cart, id_book, quantity)
       VALUES (?, ?, ?)`,
      [id_cart, bookId, quantity]
    );

    // 4. Retorna o item adicionado
    const [addedItem]: any = await pool.execute(
      "SELECT * FROM cart_items WHERE id_cart_item = ?",
      [result.insertId]
    );

    return {
      id: addedItem[0].id_cart_item.toString(),
      bookId: addedItem[0].id_book.toString(),
      quantity: addedItem[0].quantity,
      addedAt: addedItem[0].added_at
    };
  }

  async findItem(userId: string, bookId: string) {
    // 1. Encontra o carrinho do usuário
    const [cart]: any = await pool.execute(
      "SELECT id_cart FROM shopping_cart WHERE id_user = ? LIMIT 1",
      [userId]
    );
    if (cart.length === 0) return null;

    // 2. Busca o item específico
    const [item]: any = await pool.execute(
      `SELECT * FROM cart_items
       WHERE id_cart = ? AND id_book = ?`,
      [cart[0].id_cart, bookId]
    );

    return item.length > 0
      ? {
          id: item[0].id_cart_item.toString(),
          bookId: item[0].id_book.toString(),
          quantity: item[0].quantity,
          addedAt: item[0].added_at
        }
      : null;
  }

  async updateItemQuantity(userId: string, bookId: string, newQuantity: number) {
    // 1. Encontra o carrinho do usuário
    const [cart]: any = await pool.execute(
      "SELECT id_cart FROM shopping_cart WHERE id_user = ? LIMIT 1",
      [userId]
    );
    if (cart.length === 0) throw new Error("Carrinho não encontrado.");

    // 2. Atualiza a quantidade
    await pool.execute(
      `UPDATE cart_items SET quantity = ?
       WHERE id_cart = ? AND id_book = ?`,
      [newQuantity, cart[0].id_cart, bookId]
    );

    // 3. Retorna o item atualizado
    const [updatedItem]: any = await pool.execute(
      `SELECT * FROM cart_items
       WHERE id_cart = ? AND id_book = ?`,
      [cart[0].id_cart, bookId]
    );

    return {
      id: updatedItem[0].id_cart_item.toString(),
      bookId: updatedItem[0].id_book.toString(),
      quantity: updatedItem[0].quantity,
      addedAt: updatedItem[0].added_at
    };
  }
}

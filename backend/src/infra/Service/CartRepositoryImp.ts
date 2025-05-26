// src/adapters/repository/MySQLCartRepository.ts
import { CartRepository } from "src/adapters/repository/CartRepository";
import pool from "../Database/mysql"; // Importe sua conexão MySQL
import { CartItemResponse } from "src/types/cartTypes";

export class MySQLCartRepository extends CartRepository {
  async addItem(userId: string, bookId: string, quantity: number) {
    // 1. Verifica se o livro existe (opcional)
    const [book]: any = await pool.execute(
      "SELECT id FROM books WHERE id = ?",
      [bookId]
    );
    if (book.length === 0) throw new Error("Livro não encontrado.");

    // 2. Adiciona ao carrinho (ou atualiza se já existir)
    const [existingItem]: any = await pool.execute(
      "SELECT id, quantity FROM cart_items WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );

    if (existingItem.length > 0) {
      // Atualiza quantidade se o item já estiver no carrinho
      const newQuantity = existingItem[0].quantity + quantity;
      await pool.execute(
        "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND book_id = ?",
        [newQuantity, userId, bookId]
      );

      // Retorna o item atualizado
      const [updatedItem]: any = await pool.execute(
        "SELECT * FROM cart_items WHERE user_id = ? AND book_id = ?",
        [userId, bookId]
      );
      return this._mapToCartItem(updatedItem[0]);
    } else {
      // Cria um novo item no carrinho
      const [result]: any = await pool.execute(
        "INSERT INTO cart_items (user_id, book_id, quantity) VALUES (?, ?, ?)",
        [userId, bookId, quantity]
      );

      // Recupera o item inserido
      const [newItem]: any = await pool.execute(
        "SELECT * FROM cart_items WHERE id = ?",
        [result.insertId]
      );
      return this._mapToCartItem(newItem[0]);
    }
  }

  async findItem(userId: string, bookId: string) {
    const [item]: any = await pool.execute(
      "SELECT * FROM cart_items WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );
    return item.length > 0 ? this._mapToCartItem(item[0]) : null;
  }

  async updateItemQuantity(userId: string, bookId: string, newQuantity: number) {
    await pool.execute(
      "UPDATE cart_items SET quantity = ? WHERE user_id = ? AND book_id = ?",
      [newQuantity, userId, bookId]
    );

    // Retorna o item atualizado
    const [updatedItem]: any = await pool.execute(
      "SELECT * FROM cart_items WHERE user_id = ? AND book_id = ?",
      [userId, bookId]
    );
    return this._mapToCartItem(updatedItem[0]);
  }

  // Método privado para formatar a resposta
  private _mapToCartItem(item: any): CartItemResponse {
    return {
      id: item.id,
      bookId: item.book_id,
      quantity: item.quantity,
      addedAt: item.created_at,
    };
  }
}

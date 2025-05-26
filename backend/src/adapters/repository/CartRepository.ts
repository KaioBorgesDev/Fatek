import { CartItemResponse } from "src/types/cartTypes";

export abstract class CartRepository {
  abstract addItem(
    userId: string,
    bookId: string,
    quantity: number
  ): Promise<CartItemResponse>;

  abstract findItem(
    userId: string,
    bookId: string
  ): Promise<CartItemResponse | null>;

  abstract updateItemQuantity(
    userId: string,
    bookId: string,
    newQuantity: number
  ): Promise<CartItemResponse>;
}

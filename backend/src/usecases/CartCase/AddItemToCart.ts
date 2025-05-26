import { CartRepository } from "src/adapters/repository/CartRepository";


export class AddItemToCart {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string, bookId: string, quantity: number) {
    // Verifica se o livro já está no carrinho
    const existingItem = await this.cartRepository.findItem(userId, bookId);

    if (existingItem) {
      // Se já existe, atualiza a quantidade
      return this.cartRepository.updateItemQuantity(
        userId,
        bookId,
        existingItem.quantity + quantity
      );
    } else {
      // Se não existe, cria um novo item
      return this.cartRepository.addItem(userId, bookId, quantity);
    }
  }
}

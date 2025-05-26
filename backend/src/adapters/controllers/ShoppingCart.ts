// src/controllers/cartController.ts
import { AddItemToCart } from 'src/usecases/CartCase/AddItemToCart';
import { CartItemRequest } from 'src/types/cartTypes';
import { MySQLCartRepository } from 'src/infra/Service/CartRepositoryImp';

export const addItemToCart = async (req, res) => {
    console.log("cheguei")
  const cartRepository = new MySQLCartRepository();
  const addItemToCartUseCase = new AddItemToCart(cartRepository);

  const userId = req.body.id_user;
  const { bookId, quantity }: CartItemRequest = req.body;

  console.log("Dados recebidos:", { userId, bookId, quantity });

  try {
    if (!bookId || quantity <= 0) {
      return res.status(400).json({ error: "Dados inválidos." });
    }

    const cartItem = await addItemToCartUseCase.execute(userId, bookId, quantity);

    return res.status(200).json({
      message: "Item adicionado ao carrinho com sucesso!",
      cartItem,
    });
  } catch (error) {
    console.error("Erro ao adicionar item ao carrinho:", error);
    return res.status(500).json({ error: error.message || "Erro interno." });
  }
};



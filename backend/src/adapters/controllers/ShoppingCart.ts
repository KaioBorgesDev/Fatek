// src/controllers/cartController.ts
import { AddItemToCart } from '../../usecases/CartCase/AddItemToCart';
import { CartItemRequest } from '../../types/cartTypes';
import { MySQLCartRepository } from '../../infra/Service/CartRepositoryImp';

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


export const getAllItemsFromCart = async (req, res) => {
  const cartRepository = new MySQLCartRepository();
  const userId = req.body.id_user;

  try {
    const items = await cartRepository.getAllItems(userId);
    return res.status(200).json(items);
  } catch (error) {
    console.error("Erro ao obter itens do carrinho:", error);
    return res.status(500).json({ error: error.message || "Erro interno." });
  }
}


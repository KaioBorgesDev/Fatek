import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../../context/TokenProvider";

interface CartItem {
  id: string;
  bookId: string;
  quantity: number;
  bookDetails: {
    title: string;
    price: string;
  };
}

interface CartCardProps {
  cartActive: boolean;
  toggleCart: () => void;
}

const CartCard: React.FC<CartCardProps> = ({ cartActive, toggleCart }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (cartActive && token) {
      fetchCartItems();
    }
  }, [cartActive, token]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5002/cart", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setCartItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.bookDetails.price) * item.quantity);
    }, 0).toFixed(2);
  };

  if (!cartActive) return null;

  return (
    <div className="cart-overlay">
      <div className={`cart-card ${cartActive ? "active" : ""}`}>
        <div className="card-head">
          <h2>Meu Carrinho</h2>
          <button onClick={toggleCart} className="close-cart">
            <IoClose size={20} />
          </button>
        </div>

        {loading ? (
          <p>Carregando...</p>
        ) : cartItems.length === 0 ? (
          <p>Carrinho vazio</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.bookDetails.title} - 
                  R${parseFloat(item.bookDetails.price).toFixed(2)} x {item.quantity}
                </li>
              ))}
            </ul>
            <div className="card-footer">
              <p>Total: R${calculateTotal()}</p>
              <button 
                className="btn btn-primary" 
                onClick={() => navigate("/checkout")}
              >
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartCard;
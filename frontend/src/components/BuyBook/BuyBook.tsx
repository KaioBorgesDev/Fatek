import React, { useState } from 'react';
import './BuyBook.css';
import { useToken } from '../../context/TokenProvider';
import WishButton from '../WishButton/WishButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type BuyBookProps = {
  bookId?: string;
};

const BuyBook: React.FC<BuyBookProps> = ({ bookId }) => {
  const { token } = useToken();
  const navigate = useNavigate();

  const isLogged = () => {
    return token !== '';
  };

  // Simulação de dados do livro
  const book = {
    id: bookId,
    title: "Aventuras Cósmicas",
    description: "Uma jornada emocionante por galáxias desconhecidas.",
    price: 39.90,
    isbn: "978-3-16-148410-0",
    status: "Disponível",
    image: "/assets/book-6.jpg",
  };

  const [comments, setComments] = useState<string[]>([
    "Livro excelente!",
    "Me fez refletir muito, recomendo!",
    "Entrega foi super rápida!",
  ]);

  const [newComment, setNewComment] = useState("");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  const handleAddToCart = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogged()) {
      navigate('/login');
      return;
    }

    setIsAddingToCart(true);
    setCartMessage("");

    try {
      // Aqui faremos a chamada para a API
      const response = await axios.post('http://localhost:5002/cart/add', {
        bookId: book.id,
        quantity: 1 // Quantidade fixa em 1
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setCartMessage("Livro adicionado ao carrinho com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      setCartMessage("Erro ao adicionar livro ao carrinho. Tente novamente.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="buybook-container">
      <div className="buybook-card">
        <div className="buybook-content">
          <img className="buybook-image" src={book.image} alt={book.title} />
          
          <div className="buybook-details">
            <h1 className="buybook-title">{book.title}</h1>
            <p className="buybook-description">{book.description}</p>
            <p className="buybook-price">R$ {book.price.toFixed(2)}</p>
            <p className="buybook-description">ISBN: {book.isbn}</p>
            <p className="buybook-description">Status: {book.status}</p>
            
            <form onSubmit={handleAddToCart} className="cart-form">
              <div className='buy-buttons'>
                <button 
                  type="submit" 
                  className="buybook-button" 
                  style={{marginRight: '24px'}}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? 'Adicionando...' : 'Adicionar no Carrinho'}
                </button>
                <WishButton bookId={book.id!} />
              </div>
              
              {cartMessage && (
                <div className={`cart-message ${cartMessage.includes("Erro") ? 'error' : 'success'}`}>
                  {cartMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="buybook-comments">
          <h2>Comentários</h2>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>{comment}</div>
          ))}

          {isLogged() && (
            <form onSubmit={handleSubmitComment} className="comment-form">
              <input
                type="text"
                placeholder="Adicione seu comentário..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyBook;
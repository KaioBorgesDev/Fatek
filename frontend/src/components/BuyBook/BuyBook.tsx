import React, { useState } from 'react';
import './BuyBook.css';
import { useToken } from '../../context/TokenProvider';

type BuyBookProps = {
  bookId?: string;
};

const BuyBook: React.FC<BuyBookProps> = ({ bookId }) => {
  const { token } = useToken();

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
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
            <button className="buybook-button">Finalizar Compra</button>
          </div>
        </div>

        <div className="buybook-comments">
          <h2>Comentários</h2>
          {comments.map((comment, index) => (
            <div className="comment" key={index}>{comment}</div>
          ))}

          {isLogged() && (
            <form onSubmit={handleSubmit} className="comment-form">
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

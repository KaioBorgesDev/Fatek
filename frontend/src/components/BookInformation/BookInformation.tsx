import { useState } from 'react';
import './BookInformation.css';

const BookInformation = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [editora, setEditora] = useState('');
  const [ano, setAno] = useState('');
  const [genero, setGenero] = useState('');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const bookData = {
      titulo,
      autor,
      editora,
      ano,
      genero,
      isbn,
    };

    console.log("Book Data Submitted: ", bookData);
  };

  return (
    <div className="book-info-container">
      <div className="book-info-header">
        <h3>Informações do Livro</h3>
        <h4>- Gerenciar -</h4>
      </div>
      <form className="book-info-form" onSubmit={handleSubmit}>
        <div className="book-info-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            placeholder="Digite o título do livro"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="book-info-group">
          <label htmlFor="autor">Autor</label>
          <input
            type="text"
            id="autor"
            placeholder="Digite o nome do autor"
            required
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        <div className="book-info-group">
          <label htmlFor="editora">Editora</label>
          <input
            type="text"
            id="editora"
            placeholder="Digite a editora"
            required
            value={editora}
            onChange={(e) => setEditora(e.target.value)}
          />
        </div>

        <div className="book-info-group-inline">
          <div className="book-info-group">
            <label htmlFor="ano">Ano de Publicação</label>
            <input
              type="text"
              id="ano"
              placeholder="Digite o ano"
              required
              value={ano}
              onChange={(e) => setAno(e.target.value)}
            />
          </div>
          <div className="book-info-group">
            <label htmlFor="genero">Gênero</label>
            <input
              type="text"
              id="genero"
              placeholder="Digite o gênero"
              required
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
            />
          </div>
        </div>

        <div className="book-info-group">
          <label htmlFor="isbn">ISBN</label>
          <input
            type="text"
            id="isbn"
            placeholder="Digite o ISBN"
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </div>

        <button type="submit" className="book-info-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default BookInformation;

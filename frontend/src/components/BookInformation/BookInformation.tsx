import { useState } from 'react';
import './BookInformation.css';
import { toast } from 'react-toastify';

const BookInformation = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      author,
      publisher,
      year,
      genre,
      language,
      price,
      file
    };

    const response = await fetch("http://localhost:5002/book", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    
    if(response.ok){
       return toast.success("Livro criado com sucesso.");
    }
    toast.error("Não foi possivel enviar.")
  };

  return (
    <div className="book-info-container">
      <div className="header-information-book">
        <h4>Informações -</h4>
        <h3> - Livro - </h3>
      </div>
      <div className="book-info-header">
        <h3>Informações do Livro</h3>
      </div>
      <form className="book-info-form" onSubmit={handleSubmit}>
        <div className="book-info-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            placeholder="Digite o título do livro"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="book-info-group">
          <label htmlFor="author">Autor</label>
          <input
            type="text"
            id="author"
            placeholder="Digite o nome do autor"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>

        <div className="book-info-group">
          <label htmlFor="publisher">Editora</label>
          <input
            type="text"
            id="publisher"
            placeholder="Digite a editora"
            required
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        <div className="book-info-group-inline">
          <div className="book-info-group">
            <label htmlFor="year">Ano de Publicação</label>
            <input
              type="date"
              id="year"
              placeholder="Digite o ano"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="book-info-group">
            <label htmlFor="genre">Gênero</label>
            <input
              type="text"
              id="genre"
              placeholder="Digite o gênero"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>
        </div>
        <div className="book-info-group-inline">
          <div className="book-info-group">
            <label htmlFor="language">Idioma</label>
            <input
              type="text"
              id="language"
              placeholder="Digite o idioma"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="book-info-group">
            <label htmlFor="price">Preço</label>
            <input
              type="text"
              id="price"
              placeholder="Digite o preço"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="book-info-group">
          <label htmlFor="file">Foto da capa</label>
          <input type="file" name="file" id="" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="book-info-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default BookInformation;

import { useEffect, useState } from 'react';
import './BookInformation.css';
import { toast, ToastContainer } from 'react-toastify';
import { useMessage } from '../../context/MessageContext';
import { useToken } from '../../context/TokenProvider';

const BookInformation = () => {
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [release_date, set_release_date] = useState('');
  const [category, setCategory] = useState('');
  const [language, setLanguage] = useState('');
  const [imagem, setImage] = useState<File | null>(null)
  const {message, setMessage} = useMessage();
  const {token} = useToken();
  
  useEffect(() => {
    if(message){
      toast.success(message);
      setMessage('');
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setImage(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title,
      autor,
      publisher,
      release_date,
      category,
      language,
      price,
      imagem
    };

    const response = await fetch("http://localhost:5002/book", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
            <label htmlFor="release_date">Ano de Publicação</label>
            <input
              type="date"
              id="release_date"
              placeholder="Digite o ano"
              required
              value={release_date}
              onChange={(e) => set_release_date(e.target.value)}
            />
          </div>
          <div className="book-info-group">
            <label htmlFor="category">Gênero</label>
            <input
              type="text"
              id="category"
              placeholder="Digite o gênero"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
          <label htmlFor="image">Foto da capa</label>
          <input type="file" name="file" id="" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="book-info-button">
          Enviar
        </button>
      </form>
      <ToastContainer position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </div>
  );
};

export default BookInformation;

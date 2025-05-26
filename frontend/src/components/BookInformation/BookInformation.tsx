import { useEffect, useState } from 'react';
import './BookInformation.css';
import { toast, ToastContainer } from 'react-toastify';
import { useMessage } from '../../context/MessageContext';
import { useToken } from '../../context/TokenProvider';
import LoadingButton from '../Spinner/Spinner';
import { useNavigate } from 'react-router-dom';

const BookInformation = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [autor, setAutor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false)
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
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('autor', autor);
    formData.append('publisher', publisher);
    formData.append('release_date', release_date);
    formData.append('category', category);
    formData.append('language', language);
    formData.append('price', price);
    
    if (imagem) {
      formData.append('file', imagem); 
    }
  
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5002/book', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
        body: formData, 
      });

      if (response.ok) {
        toast.success("Postado com sucesso. Redirecionando para Home....")
        setTimeout(()=> {
          
          return navigate('/')
        }, 2000)
      } else {
        toast.error('Não foi possível enviar.');
      }
     
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro ao enviar.');
    } finally {
      setLoading(false);
    }
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
        <LoadingButton isLoading={loading}/> 
        
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

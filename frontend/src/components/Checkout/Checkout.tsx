import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../../context/TokenProvider';

interface CartItem {
  id: string;
  bookId: string;
  quantity: number;
  bookDetails: {
    title: string;
    image: string;
  };
}

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useToken();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zip: '',
    saveInfo: false,
  });

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5002/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Erro ao buscar itens do carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCartItems();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do formulário junto com os itens do carrinho
    navigate('/checkout/payment', { state: { formData, cartItems } });
  };

  if (loading) {
    return <div className="container">Carregando...</div>;
  }

  return (
    <div className="container">
      <main>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Seu Carrinho</span>
              <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                  <div>
                    <h6 className="my-0 text-dark">{item.bookDetails.title}</h6>
                    <small className="text-body-secondary">Quantidade: {item.quantity}</small>
                  </div>
                  <img 
                    src={item.bookDetails.image} 
                    alt={item.bookDetails.title} 
                    style={{ width: '50px', height: '70px', objectFit: 'cover' }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Endereço de Entrega</h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    placeholder='Nome'
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Sobrenome</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder='Sobrenome'
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="você@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Endereço</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="Rua, número, complemento"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-12">
                  <label htmlFor="city" className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    placeholder="Sua cidade"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="state" className="form-label">Estado</label>
                  <select
                    className="form-select"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    {/* Adicione outros estados conforme necessário */}
                  </select>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    placeholder='00000-000'
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <hr className="my-4" />

              <button 
                className="w-100 btn btn-primary btn-lg" 
                type="submit"
                disabled={cartItems.length === 0}
              >
                {cartItems.length > 0 ? 'Continuar para Pagamento' : 'Carrinho Vazio'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutForm;
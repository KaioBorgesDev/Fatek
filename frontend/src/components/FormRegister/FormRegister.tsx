import { useState } from 'react';
import './FormRegister.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';

interface RegisterPayload {
  email: string;
  password: string;
  name: string;
}

const FormRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { setMessage } = useMessage();

  const validateInput = (email: string, password: string, name: string) => {
    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Formato de e-mail inválido.");
      return false;
    }
    if (name.length < 3) {
      toast.error("O nome deve ter pelo menos 3 caracteres.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInput(username, password, name)) {
      return;
    }

    const payload: RegisterPayload = {
      email: username,
      password: password,
      name: name,
    };

    try {
      const response = await fetch("http://localhost:5002/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (response.ok) {
        setMessage("Usuário cadastrado com sucesso!");
        return navigate("/login");
      }

      if (response.status === 409) {
        return toast.error("Este email já está em uso.");
      }
      toast.error("Não foi possível cadastrar no sistema.");
    } catch (error) {
      toast.error("Cadastro falhou, verifique a conexão.");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

      <div className="form-register-background">
        <div className="form-register-shape"></div>
        <div className="form-register-shape"></div>
        <form onSubmit={handleRegister} className="form-register">
          <h3>Register</h3>

          <label htmlFor="username" className="form-register-label">Username</label>
          <input
            type="email"
            placeholder="Email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-register-input"
          />

          <label htmlFor="name" className="form-register-label">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-register-input"
          />

          <label htmlFor="password" className="form-register-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-register-input"
          />

          <input type="submit" value="Registrar" className="form-register-button" />
          
          <div className="form-register-social">
            <div className="form-register-social-go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="form-register-social-fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>

          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <Link to={'/login'}>Já possui uma conta? </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormRegister;

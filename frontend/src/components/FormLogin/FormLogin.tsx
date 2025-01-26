import { useEffect, useState } from 'react';
import './FormLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';
import { toast, ToastContainer } from 'react-toastify';
import { useToken } from '../../context/TokenProvider';

interface LoginPayload {
  email: string;
  passwordHash: string;
}

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { message, setMessage } = useMessage();
  const { setToken } = useToken();

  useEffect(() => {
    if (message !== '') {
      toast.success(message);
      setMessage('');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const payload: LoginPayload = {
      email: username,
      passwordHash: password,
    };

    try {
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        return toast.error("E-mail ou senha inválidos.");
      }

      if (response.ok) {
        const data = await response.json();
        setMessage("Bem vindo!");
        setToken(data.token);
        return navigate('/');
      }
      
      toast.error("Erro, tente novamente mais tarde.");

    } catch (error) {
      toast.error('Login failed: ' + error);
    }
  };

  return (
    <>
      <div className="form-login-background">
        <div className="form-login-shape"></div>
        <div className="form-login-shape"></div>
        <form onSubmit={handleLogin} className="form-login">
          <h3>Login</h3>

          <label htmlFor="username" className="form-login-label">Username</label>
          <input
            type="email"
            placeholder="Email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-login-input"
          />

          <label htmlFor="password" className="form-login-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-login-input"
          />

          <input type="submit" value="Log In" className="form-login-button" />
          <div className="form-login-social">
            <div className="form-login-social-go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="form-login-social-fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '10px' }}>
            <Link to={'/register'}>Não possui uma conta? </Link>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
    </>
  );
};

export default FormLogin;

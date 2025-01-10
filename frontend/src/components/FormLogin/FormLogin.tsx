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
    if (message != '') {
      toast.success(message);
      setMessage('')
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const payload: LoginPayload = {
      email: username,
      passwordHash: password,
    };

    try {
      console.log("Attempting to login...");
      const response = await fetch("http://localhost:5002/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 401)
        return toast.error("E-mail ou senha inválidos.");

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
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form onSubmit={handleLogin}>
          <h3>Login</h3>

          <label htmlFor="username">Username</label>
          <input
            type="email"
            placeholder="Email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input type="submit" value="Log In" className='button' />
          <div className="social">
            <div className="go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="fb">
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

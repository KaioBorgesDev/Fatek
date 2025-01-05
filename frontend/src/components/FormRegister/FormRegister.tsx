import { useState } from 'react';
import './FormRegister.css';
import { Link } from 'react-router-dom';

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticação pode ser adicionada aqui
    console.log('Login:', username, password);
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Register</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="Email or Phone"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Register
        </button>
        <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div>
        <div style={{textAlign: 'center', paddingTop: '10px'}}>
            <Link to={'/login'}>Já possui uma conta? </Link>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;

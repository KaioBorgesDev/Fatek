import { useState } from 'react';
import './FormLogin.css';
import { Link } from 'react-router-dom';

interface LoginPayload {
  email: string;
  passwordHash: string;
}

const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const payload: LoginPayload = {
      email: username,
      passwordHash: password,
    };

    try {
      const response = await fetch("http://fatek-backend/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
      <form>
        <h3>Login</h3>

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
          Log In
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
            <Link to={'/register'}>Não possui uma conta? </Link>         
        </div>
      </form>
    </div>
  );
};

export default FormLogin;

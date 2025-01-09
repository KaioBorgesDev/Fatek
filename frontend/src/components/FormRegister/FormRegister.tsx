import { useState } from 'react';
import './FormRegister.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useMessage } from '../../context/MessageContext';

interface RegisterPayload {
  email: string;
  password: string;
}

const FormRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setMessage} = useMessage()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página)

    const payload: RegisterPayload = {
      email: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:5002/register", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok){
          setMessage("Usuário cadastrado com sucesso!");
          return navigate("/login")
      }
        

      if (response.status === 409) {
        return toast.error("Este email já está em uso.");
      }
      toast.error("Não foi possível cadastrar no sistema.");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Cadastro falhou, verifique a conexão.");
    }
  };

  return (
    <div>
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

      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
        <form onSubmit={handleLogin}>
          <h3>Register</h3>

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

          <input type="submit" value="Register" className='button'/>
          
          <div className="social">
            <div className="go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="fb">
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

import { useState } from 'react';
import './Information.css';
import { useToken } from '../../context/TokenProvider';
import { toast, ToastContainer } from 'react-toastify';


const Information = () => {
  const [bairro, setBairro] = useState('');
  const [endereco, setEndereco] = useState('');
  const [casa, setCasa] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const {token} = useToken();
  const serchCep = async (cep: string) => {
    setCep(cep);
    
    if (cep.length === 8 || cep.length === 9 ) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
          throw new Error("Falha ao buscar o CEP");
        }
        const cepData = await response.json();
        setBairro(cepData.bairro);
        setEndereco(cepData.logradouro);
        setCidade(cepData.localidade);
        setEstado(cepData.estado);
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    } 
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      bairro,
      endereco,
      casa,
      cep,
      cidade,
      estado
    };

    console.log("Form Data Submitted: ", formData);
    console.log("Token: ", token);  
    
    fetch('http://localhost:5002/address', { method: 'POST', headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }, body: JSON.stringify(formData) }
  ).then(response => {
    if(response.ok){
      toast.success("Sucesso ao enviar seu endereço")
    } else {
      toast.error("Verifique as informações e tente novamente");
    }
  }).catch(error => {
    toast.error("Erro ao enviar o endereço", error)
  });
};

  return (
    <div className="container-information">
      <div className="header-information">
        <h3>Informações</h3>
        <h4> -- Livro - </h4>
      </div>
      <form className="form-information" onSubmit={handleSubmit}>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              placeholder="Digite seu CEP"
              required
              value={cep}
              onChange={(e) => serchCep(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="casa">Casa</label>
            <input
              type="text"
              id="casa"
              placeholder="Número da casa"
              required
              value={casa}
              onChange={(e) => setCasa(e.target.value)}
            />
          </div>       
        </div>
        <div className="form-group">
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            id="bairro"
            placeholder="Digite seu Bairro"
            required
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            id="endereco"
            placeholder="Digite seu endereço"
            required
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
        </div>
        
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              placeholder="Digite sua cidade"
              required
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              placeholder="Digite seu estado"
              required
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            />
          </div>
        </div>
        
        <div className="checkbox">
          <label>
            Salvar dados para a próxima vez?  
          </label>
            <input type="checkbox" value=""/>
          
        </div>
        
        <input type="submit" className="form-button" value={"Enviar"}/>
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

export default Information;

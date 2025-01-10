import { useState } from 'react';
import './Information.css';

const Information = () => {
  const [contato, setContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [casa, setCasa] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      contato,
      endereco,
      casa,
      cep,
      cidade,
      estado
    };

    console.log("Form Data Submitted: ", formData);
    
    // Aqui você pode adicionar a lógica para enviar os dados ao servidor
    // Exemplo:
    // fetch('sua-api-aqui', { method: 'POST', body: JSON.stringify(formData) })
  };

  return (
    <div className="container-information">
      <div className="header-information">
        <h3>Informações - </h3>
        <h4> Entrega - </h4>
        <h4>Finalizar Compra</h4>
      </div>
      <form className="form-information" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input
            type="text"
            id="contato"
            placeholder="Digite seu contato"
            required
            value={contato}
            onChange={(e) => setContato(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              placeholder="Digite seu CEP"
              required
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
          </div>
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

        <input type="submit" className="form-button" value={"Enviar"}/>
      </form>
    </div>
  );
};

export default Information;

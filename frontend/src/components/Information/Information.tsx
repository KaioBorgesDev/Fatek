import './Information.css';

const Information = () => {
  return (
    <div className="container-information">
      <div className="header-information">
        <h3>Informações - </h3>
        <h4> Entrega - </h4>
        <h4>Finalizar Compra</h4>
      </div>
      <form className="form-information">
        <div className="form-group">
          <label htmlFor="contato">Contato</label>
          <input type="text" id="contato" placeholder="Digite seu contato" required />
        </div>
        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" id="endereco" placeholder="Digite seu endereço" required />
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="casa">Casa</label>
            <input type="text" id="casa" placeholder="Número da casa" required />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP</label>
            <input type="text" id="cep" placeholder="Digite seu CEP" required />
          </div>
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="cidade">Cidade</label>
            <input type="text" id="cidade" placeholder="Digite sua cidade" required />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <input type="text" id="estado" placeholder="Digite seu estado" required />
          </div>
        </div>
        
      </form>
    </div>
  );
};

export default Information;

import React, { useState } from 'react';
import './Checkout.css'; // You'll need to create this or import Bootstrap styles

const CheckoutForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    address: '',
    city: '',
    country: '',
    state: '',
    zip: '',
    sameAddress: false,
    saveInfo: false,
  });

  const [validated, setValidated] = useState(false);

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
    const form = e.currentTarget as HTMLFormElement;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div className="container">
      <main>
        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">Seu Carrinho</span>
              <span className="badge bg-primary rounded-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0 text-dark">Product name</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$12</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0 text-dark">Second product</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$8</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0 text-dark">Third item</h6>
                  <small className="text-body-secondary">Brief description</small>
                </div>
                <span className="text-body-secondary">$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div className="text-success">
                  <h6 className="my-0 ">Promo code</h6>
                  <small className='text-primary'>EXAMPLECODE</small>
                </div>
                <span className="text-success">−$5</span>
              </li>
              <li className="list-group-item d-flex justify-content-between ">
                <span className="text-body-secondary">Total (USD)</span>
                <strong className="text-success">$20</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Promo code" />
                <button type="submit" className="btn btn-secondary">Redeem</button>
              </div>
            </form>
          </div>
          <div className="col-md-7 col-lg-8">
            <h4 className="mb-3">Endereço de Entrega</h4>
            <form 
              className={`needs-validation ${validated ? 'was-validated' : ''}`} 
              noValidate 
              onSubmit={handleSubmit}
            >
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
                  <div className="invalid-feedback">
                    Valid first name is required.
                  </div>
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">Ultimo Sobrenome</label>
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
                  <div className="invalid-feedback">
                    Valid last name is required.
                  </div>
                </div>


                <div className="col-12">
                  <label htmlFor="email" className="form-label">Email <span className="text-body-secondary">(Optional)</span></label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="você@exemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">Endereço (Casa, Rua)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    placeholder="401, Rua Mato Grosso"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">Bairro e Cidade<span className="text-body-secondary">(Optional)</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    placeholder="Jardim São Pedro, Campinas."
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-5">
                  <label htmlFor="country" className="form-label">País</label>
                  <select
                    className="form-select"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Escolha</option>
                    <option>Brasil</option>
                    <option>México</option>
                    <option>Japão</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid Country.
                  </div>
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
                    <option value="">Escolha</option>
                    <option>California</option>
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-md-3">
                  <label htmlFor="zip" className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    placeholder='13196-623'
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                  <div className="invalid-feedback">
                    Zip code required.
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="same-address"
                  name="sameAddress"
                  checked={formData.sameAddress}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="same-address">Shipping address is the same as my billing address</label>
              </div>

              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="save-info"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="save-info">Save this information for next time</label>
              </div>
              <hr className="my-4" />
              <button className="w-100 btn btn-primary btn-lg" type="submit">Informações de Pagamento</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutForm;
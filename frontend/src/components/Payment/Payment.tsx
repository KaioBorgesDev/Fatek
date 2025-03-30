import React, { useState } from 'react';

interface PaymentData {
  sameAddress: boolean;
  paymentMethod: string;
  ccName: string;
  ccNumber: string;
  ccExpiration: string;
  ccCvv: string;
}

const Payment = () => {
  const [formData, setFormData] = useState<PaymentData>({
    sameAddress: false,
    paymentMethod: 'credit',
    ccName: '',
    ccNumber: '',
    ccExpiration: '',
    ccCvv: '',
  });

  const [validated] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

return (
    <div className="container">
        <main>
            <div className="row g-5">
                <div className="col-md-5 col-lg-4 order-md-last"></div>
                <form className="payment-section">
                    <h4 className="mb-3">Pagamento</h4>
                    <hr className="my-4" />
                    <div className="my-3">
                        <div className="form-check">
                            <input
                                id="credit"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                value="credit"
                                checked={formData.paymentMethod === 'credit'}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="credit">
                                Cartão de Crédito
                            </label>
                        </div>
                        
                        <div className="form-check">
                            <input
                                id="debit"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                value="debit"
                                checked={formData.paymentMethod === 'debit'}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="debit">
                                Cartão de Débito
                            </label>
                        </div>
                        
                        <div className="form-check">
                            <input
                                id="paypal"
                                name="paymentMethod"
                                type="radio"
                                className="form-check-input"
                                value="paypal"
                                checked={formData.paymentMethod === 'paypal'}
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label" htmlFor="paypal">
                                PayPal
                            </label>
                        </div>
                    </div>

                    {['credit', 'debit'].includes(formData.paymentMethod) && (
                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label htmlFor="cc-name" className="form-label">
                                    Nome no Cartão
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${validated && !formData.ccName ? 'is-invalid' : ''}`}
                                    id="cc-name"
                                    name="ccName"
                                    value={formData.ccName}
                                    onChange={handleChange}
                                    required
                                />
                                <small className="text-body-secondary">
                                    Nome completo como no cartão
                                </small>
                                {validated && !formData.ccName && (
                                    <div className="invalid-feedback">Nome no cartão é obrigatório</div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="cc-number" className="form-label">
                                    Número do Cartão
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${validated && !formData.ccNumber ? 'is-invalid' : ''}`}
                                    id="cc-number"
                                    name="ccNumber"
                                    value={formData.ccNumber}
                                    onChange={handleChange}
                                    required
                                />
                                {validated && !formData.ccNumber && (
                                    <div className="invalid-feedback">Número do cartão é obrigatório</div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-expiration" className="form-label">
                                    Validade
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${validated && !formData.ccExpiration ? 'is-invalid' : ''}`}
                                    id="cc-expiration"
                                    name="ccExpiration"
                                    placeholder="MM/AA"
                                    value={formData.ccExpiration}
                                    onChange={handleChange}
                                    required
                                />
                                {validated && !formData.ccExpiration && (
                                    <div className="invalid-feedback">Data de validade é obrigatória</div>
                                )}
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-cvv" className="form-label">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    className={`form-control ${validated && !formData.ccCvv ? 'is-invalid' : ''}`}
                                    id="cc-cvv"
                                    name="ccCvv"
                                    value={formData.ccCvv}
                                    onChange={handleChange}
                                    required
                                />
                                {validated && !formData.ccCvv && (
                                    <div className="invalid-feedback">Código de segurança é obrigatório</div>
                                )}
                            </div>
                            <div className="form-check mt-4">
                        <hr className="my-4" />
                        <button className="w-20 btn btn-primary" type="submit">Finalizar Compra</button>
                    </div>
                        </div>
                    )}

                    
                    
                </form>
            </div>
        </main>
    </div>
)
}
  

export default Payment;
import React, { useState } from 'react';

const Payment = () => {
    const [formData, setFormData] = useState({
        sameAddress: false,
        paymentMethod: 'credit',
        ccName: '',
        ccNumber: '',
        ccExpiration: '',
        ccCvv: '',
      });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
        }));
    };
    return (
        <div>
            <hr className="my-4" />
            <h4 className="mb-3">Payment</h4>
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
                        Credit card
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
                        Debit card
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

            <div className="row gy-3">
                <div className="col-md-6">
                    <label htmlFor="cc-name" className="form-label">
                        Name on card
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-name"
                        name="ccName"
                        value={formData.ccName}
                        onChange={handleChange}
                        required
                    />
                    <small className="text-body-secondary">
                        Full name as displayed on card
                    </small>
                    <div className="invalid-feedback">Name on card is required</div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="cc-number" className="form-label">
                        Credit card number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-number"
                        name="ccNumber"
                        value={formData.ccNumber}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">
                        Credit card number is required
                    </div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="cc-expiration" className="form-label">
                        Expiration
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-expiration"
                        name="ccExpiration"
                        value={formData.ccExpiration}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Expiration date required</div>
                </div>

                <div className="col-md-3">
                    <label htmlFor="cc-cvv" className="form-label">
                        CVV
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="cc-cvv"
                        name="ccCvv"
                        value={formData.ccCvv}
                        onChange={handleChange}
                        required
                    />
                    <div className="invalid-feedback">Security code required</div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
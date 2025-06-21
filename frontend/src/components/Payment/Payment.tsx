import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../context/TokenProvider";
import axios from "axios";

interface PaymentData {
    sameAddress: boolean;
    paymentMethod: string;
    ccName: string;
    ccNumber: string;
    ccExpiration: string;
    ccCvv: string;
}

const Payment = () => {
    const { state } = useLocation(); // <- recebe dados do Checkout
    const navigate = useNavigate();
    const { token } = useToken();

    const { cartItems, formData, selectedCoupon } = state || {};
    const [paymentData, setPaymentData] = useState<PaymentData>({
        sameAddress: false,
        paymentMethod: "credit",
        ccName: "",
        ccNumber: "",
        ccExpiration: "",
        ccCvv: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setPaymentData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData || !cartItems || cartItems.length === 0) {
            alert("Dados incompletos para finalizar a compra.");
            return;
        }

        try {
            setLoading(true);

            // Mapear cartItems para incluir price (se não tiver, pegue do bookDetails)
            const cartItemsFormatted = cartItems.map((item: any) => ({
                bookId: item.bookId,
                quantity: item.quantity,
                price:
                    typeof item.bookDetails.price === "number"
                        ? item.bookDetails.price
                        : parseFloat(item.bookDetails.price),
            }));

            await axios.post(
                "http://localhost:5002/transactions",
                {
                    cartItems: cartItemsFormatted, // agora é cartItems
                    formData, // envia o formData inteiro com os dados do endereço etc.
                    selectedCoupon, // id do cupom
                    paymentMethod:
                        paymentData.paymentMethod === "credit" || paymentData.paymentMethod === "debit"
                            ? "cartao"
                            : paymentData.paymentMethod === "paypal"
                                ? "pix"
                                : paymentData.paymentMethod, // converte para seu enum do banco
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert("Compra realizada com sucesso!");
            navigate("/"); // volta para a home ou página de sucesso
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            alert("Erro ao finalizar a compra.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <main>
                <form onSubmit={handleSubmit}>
                    <h4 className="mb-3">Pagamento</h4>

                    <div className="form-check">
                        <input
                            id="credit"
                            name="paymentMethod"
                            type="radio"
                            className="form-check-input"
                            value="credit"
                            checked={paymentData.paymentMethod === "credit"}
                            onChange={handleChange}
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
                            checked={paymentData.paymentMethod === "debit"}
                            onChange={handleChange}
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
                            checked={paymentData.paymentMethod === "paypal"}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="paypal">
                            PayPal
                        </label>
                    </div>

                    {(paymentData.paymentMethod === "credit" ||
                        paymentData.paymentMethod === "debit") && (
                            <>
                                <div className="col-md-6">
                                    <label className="form-label">Nome no Cartão</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ccName"
                                        value={paymentData.ccName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Número do Cartão</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ccNumber"
                                        value={paymentData.ccNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Validade</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ccExpiration"
                                        value={paymentData.ccExpiration}
                                        onChange={handleChange}
                                        placeholder="MM/AA"
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ccCvv"
                                        value={paymentData.ccCvv}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </>
                        )}

                    <hr className="my-4" />
                    <button
                        className="w-100 btn btn-primary btn-lg"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Processando..." : "Finalizar Compra"}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default Payment;

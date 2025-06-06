export default class Transaction {
    id_transaction: number | null;
    id_order: number;
    total_amount: number;
    payment_method: "credit" | "debit";
    payment_status: "pago" | "pendente" | "cancelado";

    constructor(
        id_transaction: number | null,
        id_order: number,
        total_amount: number,
        payment_method: "credit" | "debit",
        payment_status: "pago" | "pendente" | "cancelado",
    ) {
        this.id_transaction = id_transaction;
        this.id_order = id_order;
        this.total_amount = total_amount;
        this.payment_method = payment_method;
        this.payment_status = payment_status;
    };
}

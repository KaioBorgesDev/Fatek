export default class Order {
    id_order: number | null;
    id_buyer: string;
    order_date: Date | null;
    status: string;

    constructor(id_order: number | null, id_buyer: string, order_date?: Date | null, status: string = "pendente") {
        const validStatuses = ["pendente", "aprovado", "cancelado"];

        if (!validStatuses.includes(status)) {
            throw new Error(`status deve ser um dos seguintes valores: ${validStatuses.join(", ")}.`);
        }

        this.id_order = id_order;
        this.id_buyer = id_buyer;
        this.order_date = order_date || new Date();
        this.status = status;
    }
}

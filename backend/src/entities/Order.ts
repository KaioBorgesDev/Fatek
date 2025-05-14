export default class Order {
    id_order: number | null;
    id_buyer: number;
    order_date: Date | null;
    status: string;

    constructor(id_order: number | null, id_buyer: string, order_date?: Date | null, status: string = 'pendente') {
        if (id_order === null || !Number.isInteger(id_order) || id_order <= 0) {
            throw new Error('id_order deve ser um número inteiro positivo.');
        }
        if (typeof id_buyer !== 'number' || !Number.isInteger(id_buyer) || id_buyer <= 0) {
            throw new Error('id_buyer deve ser um número inteiro positivo.');
        }
        if (order_date && (!(order_date instanceof Date) || isNaN(order_date.getTime()))) {
            throw new Error('order_date deve ser uma data válida.');
        }
        const validStatuses = ['pendente', 'aprovado', 'cancelado'];
        if (!validStatuses.includes(status)) {
            throw new Error(`status deve ser um dos seguintes valores: ${validStatuses.join(', ')}.`);
        }

        this.id_order = id_order;
        this.id_buyer = id_buyer;
        this.order_date = order_date || new Date();
        this.status = status;
    }
}

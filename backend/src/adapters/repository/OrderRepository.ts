import OrderBook from "src/entities/Order";

export interface IOrderRepository {
    create(order: OrderBook): Promise<OrderBook>;
    findById(id: string): Promise<OrderBook | null>;
    findAll(): Promise<OrderBook[]>;
    update(order: OrderBook): Promise<OrderBook>;
    delete(id: string): Promise<void>;
}

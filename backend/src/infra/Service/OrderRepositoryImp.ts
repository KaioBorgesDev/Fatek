import { IOrderRepository } from "src/adapters/repository/OrderRepository";
import OrderBook from "src/entities/Order";
import pool from "../Database/mysql";

export class OrderRepositoryImp implements IOrderRepository {
    async create(order: OrderBook): Promise<OrderBook> {
        const query = `
            INSERT INTO orders
            (id_order, id_buyer, order_date, status)
            VALUES (?, ?, CURRENT_TIMESTAMP, ?)
        `;
        const values = [order.id_order, order.id_buyer, order.status || 'pending'];

        await pool.execute(query, values);

        return order;
    }

    async findById(id: string): Promise<OrderBook | null> {
        // Implement the logic to find an order by ID
        throw new Error("Method not implemented.");
    }

    async findAll(): Promise<OrderBook[]> {
        // Implement the logic to find all orders
        throw new Error("Method not implemented.");
    }

    async update(order: OrderBook): Promise<OrderBook> {
        // Implement the logic to update an order
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        // Implement the logic to delete an order by ID
        throw new Error("Method not implemented.");
    }
}

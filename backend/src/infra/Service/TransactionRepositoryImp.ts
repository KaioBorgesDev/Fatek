import TransactionRepository from "../../adapters/repository/TransactionRepository";
import pool from "../Database/mysql";

export default class TransactionRepositoryImp implements TransactionRepository {
    async getAllTransactions(): Promise<any[]> {
        const [rows] = await pool.query("SELECT * FROM transactions");
        return rows as any[];
    }

    async getTransactionById(id: string): Promise<any | null> {
        const [rows]: any = await pool.query("SELECT * FROM transactions WHERE id = ?", [id]);
        if (rows.length === 0) return null;
        return rows[0];
    }

    async createTransaction(transaction: any): Promise<any> {
        const { amount, description, date } = transaction;
        const [result]: any = await pool.query(
            "INSERT INTO transactions (amount, description, date) VALUES (?, ?, ?)",
            [amount, description, date]
        );
        return { id: result.insertId, ...transaction };
    }

    async updateTransaction(id: string, transaction: any): Promise<any> {
        const { amount, description, date } = transaction;
        await pool.query(
            "UPDATE transactions SET amount = ?, description = ?, date = ? WHERE id = ?",
            [amount, description, date, id]
        );
        return { id, ...transaction };
    }

    private transactions: any[] = [];




}

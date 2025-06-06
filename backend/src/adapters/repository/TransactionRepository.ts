export default interface TransactionRepository {
    getAllTransactions(): Promise<any[]>;
    getTransactionById(id: string): Promise<any | null>;
    createTransaction(transaction: any): Promise<any>;
    updateTransaction(id: string, transaction: any): Promise<any>;
}

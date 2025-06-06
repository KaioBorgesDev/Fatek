export default class GetAllTransactionsByUserIdUseCase {
    private transactionRepository: any;

    constructor(transactionRepository: any) {
        this.transactionRepository = transactionRepository;
    }

    async execute(userId: string): Promise<any[]> {
        if (!userId) {
            throw new Error("User ID is required");
        }

        const transactions = await this.transactionRepository.getTransactionById(userId);
        return transactions;
    }
}

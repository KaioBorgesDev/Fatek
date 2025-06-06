import TransactionRepositoryImp from "src/infra/Service/TransactionRepositoryImp";
import GetAllTransactionsByUserIdUseCase from "src/usecases/TransactionCase/GetAllTransactionsByUserIdUseCase";


const getAllTransactionsByUserId = async (req, res) => {
    const { userId } = req.params;
    const transactionRepository = new TransactionRepositoryImp();
    const getAllTransactionsByUserIdUseCase = new GetAllTransactionsByUserIdUseCase(transactionRepository);
    try {
        const transactions = await getAllTransactionsByUserIdUseCase.execute(userId);
        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

import BookRepository from "../../adapters/repository/BookRepository";
import { IOrderRepository } from "../../adapters/repository/OrderRepository";
import UserRepository from "../../adapters/repository/UserRepository";
import OrderBook from "../../entities/Order";
import { OrderRepositoryImp } from "../../infra/Service/OrderRepositoryImp";
import MySQLUserRepository from "../../infra/Service/UserRepositoryImp";

export class BuyBookUseCase {
    private userRepository: UserRepository;
    private orderBook: IOrderRepository;

    constructor(private bookRepository: BookRepository) {
        this.userRepository = new MySQLUserRepository()
        this.orderBook = new OrderRepositoryImp();
    }

    async execute(userId: string, bookId: number): Promise<void> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const book = await this.bookRepository.findById(bookId);

        if (!book) {
            throw new Error("Book not found");
        }
        // aqui o banco mesmo deveria fazer, não o sistema !!!
        // fazer isso urgente!
        // book.status = "Finalizado"

        // await this.bookRepository.update(book, userId);

        const order = new OrderBook(null, userId, null, "pendente")

        await this.orderBook.create(order)

    }
}



export interface User {
    id: string;
    name: string;
    balance: number;
}

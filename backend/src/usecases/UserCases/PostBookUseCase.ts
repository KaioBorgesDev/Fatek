import BookRepository from "src/adapters/repository/BookRepository";

export default class PostBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(book: TypeBook): Promise<void> {
        await this.bookRepository.save(book);
    }
}

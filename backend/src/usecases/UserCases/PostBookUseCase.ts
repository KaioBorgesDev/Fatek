import BookRepository from "../../adapters/repository/BookRepository";

export default class PostBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(book: TypeBook): Promise<TypeBook> {
        return await this.bookRepository.save(book);
    }
}

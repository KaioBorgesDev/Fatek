export default class PostBookUseCase{
    constructor(readonly bookRepository: BookRepository){}

    async execute(title: string, autor: string, category: string, price: number, publisher: string, language: string, synopsis: string)
}
export default class Book {
    constructor(public book: TypeBook) {}

    validate(): TypeBook {
        if (
            !this.book.id_user ||
            !this.book.title ||
            !this.book.autor ||
            !this.book.publisher ||
            !this.book.release_date ||
            !this.book.category ||
            !this.book.price ||
            !this.book.imagem_url
        ) {
            throw new Error("Campos obrigatórios estão faltando.");
        }
        return this.book;
    }
}

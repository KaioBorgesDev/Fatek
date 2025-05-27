export default class Book {
    constructor(public book: TypeBook) {}


    // Complexidade Ciclomática = 2 (1 base + um if)
    validate(): TypeBook {
        const requiredFields = [
            'id_user', 'title', 'autor', 'publisher',
            'release_date', 'category', 'price', 'image'
        ];

        for (const field of requiredFields) {
            if (!this.book[field as keyof TypeBook]) {
                throw new Error(`Campos obrigatórios estão faltando.`);
            }
        }

        return this.book;
    }
}

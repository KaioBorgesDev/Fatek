export default interface BookRepository{
    save(book: TypeBook): Promise<void>;
    findById(id_book: number): Promise<TypeBook>
    update(book: TypeBook, id_buyer: string): Promise<void>;
}

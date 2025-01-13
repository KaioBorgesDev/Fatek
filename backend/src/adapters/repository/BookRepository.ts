export default interface BookRepository{
    save(book: TypeBook): Promise<void>;
}
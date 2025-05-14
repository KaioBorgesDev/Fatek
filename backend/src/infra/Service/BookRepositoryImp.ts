import BookRepository from "src/adapters/repository/BookRepository";
import pool from "../Database/mysql";
export default class MySQLBookRepository implements BookRepository {
    async update(book: TypeBook, id_buyer: string): Promise<void> {
        const query = `
            UPDATE books
            SET status = ? WHERE id = ? AND id_user = ?
        `;
        const [result]: any = await pool.execute(query, [
            book.status,
            book.id_book,
            id_buyer
        ]);

        if (result.affectedRows === 0) {
            throw new Error("Book not found or user not authorized.");
        }
    }
    async findById(id_book: number): Promise<TypeBook> {
        const query = "SELECT * FROM books WHERE id = ?";
        const [rows]: any = await pool.execute(query, [id_book]);

        if (rows.length === 0) {
            throw new Error("Book not found.");
        }

        return rows[0] as TypeBook;
    }
    async save(book: TypeBook): Promise<void> {
        const queryUser = "SELECT * FROM users WHERE id_user = ?";
        const [userRows]: any = await pool.execute(queryUser, [book.id_user]);

        if (userRows.length === 0) {
            throw new Error("User doesn't exist.");
        }
        const query = `
            INSERT INTO books (id_user, title, author, publisher, release_date, category, price, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await pool.execute(query, [
            book.id_user,
            book.title,
            book.autor,
            book.publisher,
            book.release_date,
            book.category,
            book.price,
            book.image
        ]);
    }
}

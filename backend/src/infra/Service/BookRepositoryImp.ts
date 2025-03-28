import BookRepository from "src/adapters/repository/BookRepository";
import pool from "../Database/mysql";
export default class MySQLBookRepository implements BookRepository {

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

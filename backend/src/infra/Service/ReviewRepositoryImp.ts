import ReviewRepository from "src/adapters/repository/ReviewRepository";
import { Review } from "src/types/Review";
import pool from "../Database/mysql"
export default class ReviewRepositoryImp implements ReviewRepository{
    async save(review: Review) {
        const query = "INSERT INTO reviews(id_user, id_book, rating, comment) VALUES(?,?,?,?)";
        await pool.execute(query, [review.id_user, review.id_book, review.rating, review.comment]);
    }
}

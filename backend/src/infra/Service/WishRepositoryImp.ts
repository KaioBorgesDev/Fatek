import WishRepository from "src/adapters/repository/WishRepository";
import { Wish } from "src/types/Wish";
import pool from '../Database/mysql'
export default class WishRepositoryImp implements WishRepository{
    async save(wish: Wish) {
        console.log("This is the new wish entities", wish);
        const query = "INSERT INTO WISHLIST(id_user, id_book, added_date), VALUES(?,?,?);"
        await pool.execute(query, [wish.id_user, wish.id_book, wish.added_date])
    }

}

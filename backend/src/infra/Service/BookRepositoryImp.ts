import BookRepository from "src/adapters/repository/BookRepository";
import BookModel from "../Model/BookModel";
import UserModel from "../Model/UserModel";

export default class BookRepositoryImp implements BookRepository{

    async save(book: TypeBook): Promise<void> {
        if(!await UserModel.findOne({id_user: book.id_user}))
            throw new Error("User dont exits.");
        await BookModel.create(book);
    }

}
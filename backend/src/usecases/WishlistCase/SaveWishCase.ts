import WishRepository from "src/adapters/repository/WishRepository";
import { Wish } from "src/types/Wish";

export default class SaveWishCase{
    private wishRepository: WishRepository;

    constructor(
        wishRepository: WishRepository
    ){
        this.wishRepository = wishRepository;
    }

    async execute(wish: Wish){
       await this.wishRepository.save(wish);
    }

}

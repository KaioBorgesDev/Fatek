import { Wish } from "src/types/Wish";

export default interface WishRepository {
    save(wish: Wish);
}

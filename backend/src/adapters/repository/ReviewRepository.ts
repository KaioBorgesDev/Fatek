import { Review } from "src/types/Review";

export default interface ReviewRepository{
    save(review: Review)
}

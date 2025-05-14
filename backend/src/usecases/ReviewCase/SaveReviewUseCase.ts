import ReviewRepository from "src/adapters/repository/ReviewRepository";
import { Review } from "src/types/Review";

export default class SaveReviewUseCase{
    constructor(private readonly reviewRepository: ReviewRepository){
    }
    async execute(review: Review){
        await this.reviewRepository.save(review)
    }
}

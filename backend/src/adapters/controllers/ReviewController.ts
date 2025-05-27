import ReviewRepositoryImp from "../../infra/Service/ReviewRepositoryImp";
import { Review } from "../../types/Review";
import SaveReviewUseCase from "../../usecases/ReviewCase/SaveReviewUseCase";

const saveReviewController = async (req, res) => {
    const reviewRepository = new ReviewRepositoryImp();
    const createReview = new SaveReviewUseCase(reviewRepository);
    const { id_user, id_book, rating, comment } = req.body;
    const review: Review = {
        id_user,
        id_book,
        rating,
        comment
    }

    try {
        await createReview.execute(review);
        res.status(201).json({ message: "Review created successfully", review });
    }catch (error) {
        res.status(400).json({
            error: "Error creating review: " + error.message,
        });

    }
}
module.exports ={
    saveReviewController
}

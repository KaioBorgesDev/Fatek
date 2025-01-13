import PostBookUseCase from "src/usecases/UserCases/PostBookUseCase";
import BookRepositoryImp from "src/infra/Service/BookRepositoryImp";

const postBookController = async (req, res) => {
    try {
        const postBook = new PostBookUseCase(new BookRepositoryImp());
        const id_user = req.body.user.id_user;
        
        await postBook.execute(req.body); 
        
        res.status(200).json({ message: "Book created sucessfuly!" });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Book with this code already exists",
            });
        }
        res.status(400).json({ error: error.message || "Error on create book." });
    }
};

module.exports = { postBookController };
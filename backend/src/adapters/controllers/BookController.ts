import PostBookUseCase from "src/usecases/UserCases/PostBookUseCase";
import BookRepositoryImp from "src/infra/Service/BookRepositoryImp";

const postBookController = async (req, res) => {
    try {
        const postBook = new PostBookUseCase(new BookRepositoryImp());
        
        await postBook.execute(req.body); 
        
        res.status(200).json({ message: "Livro criado com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: error.message || "Erro ao criar o livro." });
    }
};

module.exports = { postBookController };
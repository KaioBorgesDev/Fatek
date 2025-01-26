import PostBookUseCase from "src/usecases/UserCases/PostBookUseCase";
import BookRepositoryImp from "src/infra/Service/BookRepositoryImp";
const { v4: uuidv4 } = require('uuid');
const s3 = require('../../infra/Config/s3');




const postBookController = async (req, res) => {
    try {
        const file = req.file;

        if(!file){
            return res.status(400).json({ error: "Imagem do livro é obrigatória"});
        }

        const fileKey = `books/${uuidv4()}_${file.originalname}}`;
        
        const result = await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        req.body.image = result.Location;
        
        const postBook = new PostBookUseCase(new BookRepositoryImp());
        await postBook.execute(req.body); 

        res.status(201).json({ message: "Book created sucessfuly!" });

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
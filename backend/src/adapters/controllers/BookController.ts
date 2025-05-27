import PostBookUseCase from "../../usecases/UserCases/PostBookUseCase";
import BookRepositoryImp from "../../infra/Service/BookRepositoryImp";
import { BuyBookUseCase } from "../../usecases/UserCases/BuyBookUseCase";
import MySQLBookRepository from "../../infra/Service/BookRepositoryImp";
const { v4: uuidv4 } = require("uuid");

const isProduction = process.env.NODE_ENV === "production";

// Se não estiver em produção, usamos um mock para evitar upload real
const s3 = isProduction
    ? require("../../infra/Config/s3")
    : {
          upload: ({ Key }) => ({
              promise: async () => ({
                  Location: `https://mocked-s3-url.com/${Key}`,
              }),
          }),
      };

const postBookController = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "Imagem do livro é obrigatória" });
        }

        const fileKey = `books/${uuidv4()}_${file.originalname}`;

        const result = await s3.upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        }).promise();

        req.body.image = result.Location;

        const postBook = new PostBookUseCase(new BookRepositoryImp());

        await postBook.execute(req.body);


        res.status(201).json({ message: "Book created successfully!" });
    } catch (error) {
        if (error.code === "MissingRequiredParameter") {
            return res.status(401).json({
                message: "Missing credentials AWS",
            });
        }
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Book with this code already exists",
            });
        }
        res.status(400).json({ error: error.message || "Error on create book." });
    }
};

const purchaseBookController = async (req, res) => {
    try {
        const { id_book, id_user } = req.body;

        if (!id_book || !id_user) {
            return res.status(400).json({ error: "Book ID and User ID are required" });
        }

        const purchaseBookUseCase = new BuyBookUseCase(new MySQLBookRepository());
        await purchaseBookUseCase.execute(id_user, id_book);

        res.status(200).json({ message: "Book purchased successfully!" });
    } catch (error) {
        res.status(400).json({ error: error.message || "Error on purchasing book." });
    }
};

export { postBookController, purchaseBookController };

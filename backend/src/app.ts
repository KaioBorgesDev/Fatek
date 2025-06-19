const {loginController, registerController, registerUserAdressController} = require("./adapters/controllers/UserController")
const {postBookController, purchaseBookController} = require("./adapters/controllers/BookController")
const {saveSubscriptionController} = require("./adapters/controllers/SubscriptionController")
const {saveWishController} = require("./adapters/controllers/WishController")
const {saveReviewController} = require("./adapters/controllers/ReviewController")
const {authJwt} = require("./adapters/midlewares/AuthJwt")

const multer = require("multer");
const express = require("express");
const cors = require("cors")
const app = express();
import pool from "./infra/Database/mysql";
import { addItemToCart, getAllItemsFromCart } from "./adapters/controllers/ShoppingCart"
import EmailerServiceImp from "./infra/Service/EmailerServiceImp";
import SendEmail from "./usecases/EmailCase/SendEmail";
const storage = multer.memoryStorage();
const upload = multer({ storage });
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
})

app.get("/send_email_teste", () => {
    const sendEmail = new SendEmail(new EmailerServiceImp());
    sendEmail.execute("1231", "Teste", "<h1>Teste</h1>", "Teste");
});

app.post("/login", loginController);

app.post("/register", registerController);

app.post("/book", upload.single("file"), authJwt, postBookController);

app.post("/address", authJwt, registerUserAdressController);

app.post("/buy", authJwt, purchaseBookController);

app.get("/teste", (req,res)=>{
    res.status(200).send("certo")
})

app.post("/review", authJwt, saveReviewController)

app.post("/wish", authJwt, saveWishController)

app.post("/cart/add", authJwt, addItemToCart)

app.get("/cart", authJwt, getAllItemsFromCart)

app.get("/isAdmin", authJwt, async (req,res)=>{
    const id_user = req.body.id_user;
    if (id_user !== "f1c509d6-1b11-434d-80aa-efd7856e62b2") {
        return res.status(200).send({isAdmin: false});
    }
    return res.status(200).send({isAdmin: true});
})


app.get("/admin/active-users-count", authJwt, async (req, res) => {
  try {
    const id_user = req.body.id_user || req.query.id_user;
    const role = req.body.role || req.query.role;
    console.log("ID do usuário:", role);

    if (role !== "admin") {
      return res.status(500).json({ error: "Acesso negado. Apenas administradores." });
    }

    console.log("ID do usuário:", id_user);
    const query = "SELECT COUNT(*) AS count FROM users WHERE account_status = 'ativo'";
    const [rows]: any = await pool.execute(query);

    const count = rows[0]?.count ?? 0;

    return res.status(200).json({ activeUsers: count });
  } catch (error) {
    console.error("Erro ao buscar usuários ativos:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT id_category, name FROM book_categories ORDER BY name");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default app;

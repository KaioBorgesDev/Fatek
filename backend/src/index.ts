const {loginController, registerController, registerUserAdressController} = require("./adapters/controllers/UserController")
const {postBookController, purchaseBookController} = require("./adapters/controllers/BookController")
const {saveSubscriptionController} = require("./adapters/controllers/SubscriptionController")
const {saveWishController} = require("./adapters/controllers/WishController")
const {saveReviewController} = require("./adapters/controllers/ReviewController")
const {authJwt} = require("./adapters/midlewares/AuthJwt")
const multer = require('multer');
const express = require("express");
const cors = require('cors')
const app = express();
import connectDB = require('./infra/Database/mysql')
import EmailerServiceImp from './infra/Service/EmailerServiceImp';
import SendEmail from './usecases/EmailCase/SendEmail';
const storage = multer.memoryStorage();
const upload = multer({ storage });
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})

app.get('/send_email_teste', () => {
    const sendEmail = new SendEmail(new EmailerServiceImp());
    sendEmail.execute("1231", "Teste", "<h1>Teste</h1>", "Teste");
});

app.post('/login', loginController);

app.post('/register', registerController);

app.post('/book', upload.single('file'), authJwt, postBookController);

app.post('/address', authJwt, registerUserAdressController);

app.post('/buy', authJwt, purchaseBookController);

app.get('/teste', (req,res)=>{
    res.status(200).send("certo")
})
app.post('/subscription', saveSubscriptionController)

app.post('/review', saveReviewController)

app.post('/wish', saveWishController)


app.listen(5002)
module.exports = app;

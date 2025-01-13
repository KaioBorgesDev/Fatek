const {loginController, registerController} = require("./adapters/controllers/UserController")
const {postBookController} = require("./adapters/controllers/BookController")

const express = require("express");
const cors = require('cors')
const app = express();
const connectDB = require('./infra/Database/ConnectDb')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})


app.post('/login', loginController);

app.post('/register', registerController);

app.post('/book', postBookController);

app.get('/teste', (req,res)=>{
    res.status(200).send("certo")
})

app.listen(5002)
module.exports = app;
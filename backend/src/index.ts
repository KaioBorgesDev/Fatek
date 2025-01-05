import LoginController = require('./adapters/controllers/UserController')

const express = require("express");
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
})


app.post('/login', LoginController)


app.listen(5002)
module.exports = app;
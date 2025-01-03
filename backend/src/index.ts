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


app.get("/teste", (req,res)=>{
    res.status(200).send("Certo");
});

app.listen(5002)
module.exports = app;
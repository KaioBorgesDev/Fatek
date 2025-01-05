const mongoose = require("mongoose");

const getConnectionByEnv = () => {
    if (process.env.NODE_ENV === "prod") return process.env.MONGO_URI_PROD;
    return "mongodb://localhost:27017/fatek";
};
 const connect = async () => {
    await mongoose.connect(getConnectionByEnv()).catch(console.error);
    console.log("database started");
};

module.exports = connect;
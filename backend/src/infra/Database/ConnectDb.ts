const mongoose = require("mongoose");

const getConnectionByEnv = () => {
    if (process.env.NODE_ENV === "prod") return process.env.MONGO_URI_PROD;
    return "mongodb://localhost:27017/fatek";
};
 const connect = async () => {
    console.log('trying connect on database...')
    await mongoose.connect(getConnectionByEnv()).catch(console.error);
    console.log("database connected.");
};

module.exports = connect;
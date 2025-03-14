import mysql from "mysql2/promise";

const connectDB = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "fatek",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

async function testConnection() {
    try {
        const connection = await connectDB.getConnection();
        console.log("✅ Conectado ao banco de dados");
        connection.release();
    } catch (err) {
        console.error("❌ Erro ao conectar ao banco de dados:", err);
    }
}

testConnection();

export default connectDB

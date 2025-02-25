import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "senha",
    database: process.env.DB_NAME || "meu_banco",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

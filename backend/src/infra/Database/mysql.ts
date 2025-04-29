import { exec } from "child_process";
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


async function testConnection(retries = 2, interval = 5000) {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await connectDB.getConnection();
            console.log("✅ Conectado ao banco de dados");
            connection.release();
            return;
        } catch (err) {
            console.error(`❌ Tentativa ${i + 1} - Erro ao conectar:`, err.message);
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, interval));
            }
        }
    }

    console.error("❌ Todas as tentativas de conexão falharam");
    console.log("🚢 Tentando subir os containers...");

    exec("docker compose up mysql-fatek -d", (error, stdout, stderr) => {
        if (error) {
            console.error("❌ Erro ao subir os containers:", error.message);
            process.exit(1);
            return;
        }

        if (stderr) {
            console.error(`⚠️ Stderr: ${stderr}`);
        }

        console.log(`✅ Containers iniciados:\n${stdout}`);

        // Espera 10 segundos antes de tentar novamente
        setTimeout(() => {
            console.log("🔁 Tentando novamente conexão após subir containers...");
            testConnection(); // tenta novamente
        }, 10000);
    });
}


// Aguarde alguns segundos antes de testar a conexão
setTimeout(() => testConnection(), 10000);

export default connectDB;

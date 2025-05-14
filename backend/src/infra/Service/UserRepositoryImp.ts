import UserRepository from "src/adapters/repository/UserRepository";
import User from "src/entities/User";
import pool from "../Database/mysql";
import AdressUser from "src/entities/AdressUser";


export default class MySQLUserRepository implements UserRepository {
    async findById(userId: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE id_user = ?";
        const [rows]: any = await pool.execute(query, [userId]);

        if (rows.length === 0) return null;
        const row = rows[0];
        return new User(row.email, row.passwordHash, row.id_user);
    }

    async saveAdress(userId: string, address: AdressUser): Promise<void> {
        const query = `
            UPDATE users SET address = JSON_OBJECT(
                'number', ?,
                'street', ?,
                'city', ?,
                'state', ?,
                'postalCode', ?,
                'neighborhood', ?
            ) WHERE id_user = ?
        `;
        await pool.execute(query, [
            address.casa,
            address.endereco,
            address.cidade,
            address.estado,
            address.cep,
            address.bairro,
            userId
        ]);
    }

    async findByEmail(email: string): Promise<User | null> {
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows]: any = await pool.execute(query, [email]);

        if (rows.length === 0) return null;
        const row = rows[0];
        return new User(row.email, row.passwordHash, row.id_user, row.name);
    }

    async save(email: string, password: string, name: string): Promise<void> {
        const user = User.create(email, password, name );
        const query = "INSERT INTO users (id_user, email, passwordHash, name) VALUES (?, ?, ?, ?)";
        await pool.execute(query, [user.id_user, user.email, user.passwordHash, user.name]);
    }
}

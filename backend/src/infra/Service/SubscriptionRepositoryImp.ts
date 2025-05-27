import SubscriptionRepository from "../../adapters/repository/SubscriptionRepository";
import pool from "../Database/mysql"
import Subscription from "../../types/Subscription";

export default class SubscriptionRepositoryImp implements SubscriptionRepository {
    async save(subscription: Subscription): Promise<string> {
        const query = "INSERT INTO subscriptions(id_user, plan, start_date, end_date, status)" +
        "VALUES(?, ?, ?, ?, ? )";

        const [rows]: any = await pool.execute(query, [subscription.id_user, subscription.plan, subscription.start_date, subscription.end_date, subscription.status]);

        if (rows.length === 0) return "erro";
        return "success";
    }
    async findById(id: string): Promise<Subscription | null> {
        const query = "SELECT * FROM SUBSCRIPTIONS WHERE id_user = ?";
        const [rows]: any = await pool.execute(query, [id]);
        if (rows.length === 0) return null;
        const row = rows[0];
        return new Subscription(row.id_user, row.plan, row.start_date, row.end_date, row.status);
    }

    async remove(id: string): Promise<any> {
        const query = "DELETE FROM SUBSCRIPTIONS WHERE id_user = ?";
        const [result]: any = await pool.execute(query, [id]);
        return result.affectedRows > 0;
    }

}

export default class Subscription{
    id_user: string;
    plan: "mensal" | "anual"
    start_date: Date;
    end_date: Date;
    status: "ativo" | "inativo"

    constructor(id_user: string, plan: "mensal" | "anual", start_date: Date, end_date: Date, status: "ativo" | "inativo") {
        this.id_user = id_user;
        this.plan = plan;
        this.start_date = start_date;
        this.end_date = end_date;
        this.status = status;
    }
}

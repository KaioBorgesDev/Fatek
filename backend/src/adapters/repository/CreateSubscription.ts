import SubscriptionRepository from "./SubscriptionRepository";

export default class CreateSubscription {
    constructor(readonly subscriptionRepository: SubscriptionRepository) {
    }
    async execute(id_user: string, plan: "mensal" | "anual", start_date: Date, end_date: Date, status: "ativo" | "inativo") {
        const subscription = {
            id_user,
            plan,
            start_date,
            end_date,
            status
        };
        return await this.subscriptionRepository.save(subscription);
    }
}

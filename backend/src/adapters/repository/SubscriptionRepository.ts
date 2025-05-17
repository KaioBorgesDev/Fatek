import Subscription from "src/types/Subscription";

export default interface SubscriptionRepository {
    save(subscription: Subscription): Promise<string>;
    findById(id: string): Promise<Subscription | null>;
    remove(id: string): Promise<any>;
}

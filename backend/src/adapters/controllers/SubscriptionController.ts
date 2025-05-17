import SubscriptionRepositoryImp from "src/infra/Service/SubscriptionRepositoryImp";
import CreateSubscription from "../repository/CreateSubscription";

const saveSubscriptionController = async (req, res) =>{
    const subscriptionRepository = new SubscriptionRepositoryImp();
    const createSubscription = new CreateSubscription(subscriptionRepository);
    const { id_user, plan, start_date, end_date, status } = req.body;
    try {
        const subscription = await createSubscription.execute(id_user, plan, start_date, end_date, status);
        return res.status(201).json({ message: "Assinatura criada com sucesso", subscription });
    }
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Assinatura já existe",
            });
        }
        return res.status(400).json({
            error: "Erro ao criar assinatura: " + error.message,
        });
    }
}

module.exports = {
    saveSubscriptionController
};
